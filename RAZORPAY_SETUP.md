# Razorpay Setup Guide - Spreading Smiling NGO

## 🎯 Complete Razorpay Integration

आपका Backend अब **Razorpay** के साथ perfectly setup है!

---

## 📋 Step 1: Create Razorpay Account

### Account बनाओ:

1. Go to: https://razorpay.com
2. Click **"Sign Up"**
3. Email/Phone से register करो
4. Email verify करो
5. Business details fill करो (NGO के details)

---

## 📋 Step 2: Get API Credentials

### Razorpay Dashboard में:

1. **Settings > API Keys** पर जाओ
2. अपने **Test Mode** credentials copy करो:
   - **Key ID** (Public key)
   - **Key Secret** (Secret key)

#### Screenshot:
```
Dashboard
  └── Settings
      └── API Keys
          ├── Key ID: rzp_test_xxxxxxxxxx
          └── Key Secret: xxxxxxxxxxxxxxxx
```

---

## 📋 Step 3: Update .env File

अपना `backend/.env` update करो:

```env
# Razorpay (for payment)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret_here
```

### Example:
```env
RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=abcdef123456789xyz
```

---

## 🚀 Payment Flow

```
Frontend
   ↓
User clicks Donate
   ↓
POST /api/donations/create-order
   ↓
Backend creates Razorpay Order
   ↓
Returns Order ID + Key
   ↓
Razorpay Payment Modal Opens
   ↓
User enters payment details
   ↓
Payment successful
   ↓
POST /api/donations/verify-payment
   ↓
Backend verifies signature
   ↓
Save to database
   ↓
Success ✅
```

---

## 📡 API Endpoints

### 1. Create Order

```bash
POST /api/donations/create-order

Headers:
  Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "amount": 1000,
  "message": "Love your work",
  "isAnonymous": false
}

Response:
{
  "success": true,
  "orderId": "order_1234567890",
  "amount": 100000,
  "key": "rzp_test_xxxxxxxxxx"
}
```

---

### 2. Verify Payment

```bash
POST /api/donations/verify-payment

Headers:
  Content-Type: application/json

Body:
{
  "razorpay_order_id": "order_1234567890",
  "razorpay_payment_id": "pay_1234567890",
  "razorpay_signature": "signature_hash",
  "name": "John Doe",
  "email": "john@example.com",
  "amount": 1000,
  "message": "Love your work",
  "isAnonymous": false
}

Response:
{
  "success": true,
  "message": "Payment verified and donation recorded",
  "data": {
    "_id": "donation_id",
    "name": "John Doe",
    "email": "john@example.com",
    "amount": 1000,
    "paymentId": "pay_1234567890",
    "orderId": "order_1234567890",
    "status": "completed",
    "createdAt": "2024-02-15T10:30:00.000Z"
  }
}
```

---

### 3. Get All Donations (Admin)

```bash
GET /api/donations

Headers:
  Authorization: Bearer <token>

Response:
{
  "success": true,
  "count": 25,
  "totalAmount": 125000,
  "data": [...]
}
```

---

### 4. Get Donation Stats (Admin)

```bash
GET /api/donations/stats

Headers:
  Authorization: Bearer <token>

Response:
{
  "success": true,
  "stats": {
    "totalDonations": 25,
    "totalAmount": 125000
  }
}
```

---

## 🎨 Frontend Implementation Example

### React with Razorpay Script:

#### 1. Add Razorpay Script in HTML

```html
<!-- public/index.html -->
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

---

#### 2. Create Donate Component

```javascript
// src/pages/Donate.tsx
import { useState } from 'react';
import axios from 'axios';

export default function Donate() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    message: '',
    isAnonymous: false
  });

  const handleDonate = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create Order
      const orderResponse = await axios.post(
        'http://localhost:3000/api/donations/create-order',
        formData
      );

      const { orderId, amount, key } = orderResponse.data;

      // Step 2: Open Razorpay Modal
      const options = {
        key: key,
        amount: amount,
        currency: 'INR',
        name: 'Spreading Smiling NGO',
        description: 'Support our cause',
        order_id: orderId,
        handler: async (response) => {
          // Step 3: Verify Payment
          const verifyResponse = await axios.post(
            'http://localhost:3000/api/donations/verify-payment',
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              ...formData
            }
          );

          if (verifyResponse.data.success) {
            alert('Thank you for your donation! 🙏');
            setFormData({
              name: '',
              email: '',
              amount: '',
              message: '',
              isAnonymous: false
            });
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email
        },
        theme: {
          color: '#3399cc'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="donate-page">
      <form onSubmit={handleDonate}>
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Amount (₹)"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
        />

        <textarea
          placeholder="Message (Optional)"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />

        <label>
          <input
            type="checkbox"
            checked={formData.isAnonymous}
            onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
          />
          Donate Anonymously
        </label>

        <button type="submit">Donate Now ₹{formData.amount || '0'}</button>
      </form>
    </div>
  );
}
```

---

## 🧪 Test Payment

### Test Card Details:

```
Card Number: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123
```

### Test Payment IDs:
- **Success**: Any test card works
- **Failure**: Use card ending in 0002 for failed payments

---

## 🔒 Security Features

✅ **Signature Verification**: Verify Razorpay signature before saving  
✅ **Amount Validation**: Backend validates amount  
✅ **Email Verification**: Confirm email for anonymous donations  
✅ **JWT Auth**: Admin endpoints protected  
✅ **No Sensitive Data**: Keys stored in .env  

---

## 📊 Dashboard Stats

Admin Panel दिखाएगा:
- Total Donations Count
- Total Amount Raised
- Recent Donors List
- Donation History

---

## 🐛 Troubleshooting

### "Order creation failed"
- ✗ Amount is 0 या negative
- ✓ Amount > 1 (minimum ₹1)

### "Invalid signature"
- ✗ Payment details हैं modify किए गए
- ✓ Check order ID और payment ID

### "Key not loading"
- ✗ .env में credentials नहीं हैं
- ✓ Restart server और check .env

### "Modal not opening"
- ✗ Razorpay script नहीं load हुई
- ✓ `<script src="checkout.js">` add करो

---

## 💡 Pro Tips

✅ **Test Mode First**: Always test with test keys  
✅ **Monitor Transactions**: Check Razorpay dashboard  
✅ **Customer Support**: Add help email in footer  
✅ **Email Receipts**: Send thank you emails automatically  
✅ **Tax Compliance**: Maintain records for NGO reports  

---

## 📱 Production Setup

### Go Live:

1. **Razorpay Dashboard** में "Go Live" click करो
2. **Live Keys** copy करो (rzp_live_...)
3. `.env` में update करो
4. **Test करो** फिर deploy करो

```env
RAZORPAY_KEY_ID=rzp_live_xxxxxxx
RAZORPAY_KEY_SECRET=your_live_secret
```

---

## 🎉 You're All Set!

अब आपका Payment System ready है!

### Next Steps:
1. Backend start करो: `npm run dev`
2. .env में credentials add करो
3. Frontend payment page बनाओ
4. Test payment करो
5. Production deploy करो

**Happy Fundraising!** 🚀💰

---

## 📚 Additional Resources

- **Razorpay Docs**: https://razorpay.com/docs
- **API Reference**: https://razorpay.com/docs/api
- **Webhooks**: https://razorpay.com/docs/webhooks
- **Support**: support@razorpay.com
