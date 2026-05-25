import HeroSlider from '../models/HeroSlider.js';

const defaultSlides = [
  {
    image: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1778003131/Post_one_yrcaeg.jpg",
    tag: "A Youth-Driven NGO from Indore",
    headline: "Spreading Smiles,",
    headlineAccent: "One Life at a Time.",
    sub: "A youth-driven initiative dedicated to helping communities through education, healthcare, and social support.",
    hindi: "इंदौर के युवाओं द्वारा समाज सेवा की एक पहल",
    primaryCta: { label: "Donate Now", to: "/donate" },
    secondaryCta: { label: "Join as Volunteer", to: "/volunteer" },
  },
  {
    image: "https://res.cloudinary.com/dhy9pmo8s/image/upload/v1778004129/post4_r13k3g.jpg",
    tag: "Child Welfare & Education",
    headline: "Every Child Deserves",
    headlineAccent: "A Brighter Tomorrow.",
    sub: "From orphanage visits to scholarship support, we ensure no child grows up without care, education, or hope.",
    hindi: "हर बच्चे को प्यार और शिक्षा का अधिकार है",
    primaryCta: { label: "Support a Child", to: "/donate" },
    secondaryCta: { label: "Our Programs", to: "/what-we-do" },
  },
  {
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=80",
    tag: "Healthcare & Blood Drives",
    headline: "Healthy Communities,",
    headlineAccent: "Stronger Futures.",
    sub: "Free medical camps, blood donation drives, and health awareness — bringing essential care to those who need it most.",
    hindi: "स्वस्थ समाज के लिए हमारा संकल्प",
    primaryCta: { label: "Donate Now", to: "/donate" },
    secondaryCta: { label: "See Our Impact", to: "/what-we-do" },
  },
  {
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80",
    tag: "Volunteer with Us",
    headline: "Your Time Can Change",
    headlineAccent: "Someone's World.",
    sub: "No experience needed — just a willing heart. Join hundreds of volunteers making a difference across Indore.",
    hindi: "बदलाव की शुरुआत आपसे होती है",
    primaryCta: { label: "Become a Volunteer", to: "/volunteer" },
    secondaryCta: { label: "Learn More", to: "/what-we-do" },
  },
];

export const getHeroSlides = async (req, res, next) => {
  try {
    const heroSlider = await HeroSlider.findOne({});

    if (!heroSlider || !heroSlider.slides?.length) {
      return res.status(200).json({ success: true, data: { slides: defaultSlides } });
    }

    res.status(200).json({ success: true, data: { slides: heroSlider.slides } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHeroSlides = async (req, res, next) => {
  try {
    const { slides } = req.body;

    if (!Array.isArray(slides) || slides.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide hero slides to save' });
    }

    const cleanedSlides = slides.map((slide) => ({
      image: slide.image || '',
      tag: slide.tag || '',
      headline: slide.headline || '',
      headlineAccent: slide.headlineAccent || '',
      sub: slide.sub || '',
      hindi: slide.hindi || '',
      primaryCta: {
        label: slide.primaryCta?.label || 'Donate Now',
        to: slide.primaryCta?.to || '/donate'
      },
      secondaryCta: {
        label: slide.secondaryCta?.label || 'Learn More',
        to: slide.secondaryCta?.to || '/what-we-do'
      }
    }));

    const updated = await HeroSlider.findOneAndUpdate(
      {},
      { slides: cleanedSlides },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
