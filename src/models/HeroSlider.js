import mongoose from 'mongoose';

const heroSliderSchema = new mongoose.Schema(
  {
    slides: [
      {
        image: {
          type: String,
          required: [true, 'Please provide slide image URL']
        },
        tag: {
          type: String,
          required: [true, 'Please provide slide tag']
        },
        headline: {
          type: String,
          required: [true, 'Please provide headline']
        },
        headlineAccent: {
          type: String,
          required: [true, 'Please provide headline accent']
        },
        sub: {
          type: String,
          required: [true, 'Please provide sub text']
        },
        hindi: {
          type: String,
          required: [true, 'Please provide hindi text']
        },
        primaryCta: {
          label: {
            type: String,
            default: 'Donate Now'
          },
          to: {
            type: String,
            default: '/donate'
          }
        },
        secondaryCta: {
          label: {
            type: String,
            default: 'Learn More'
          },
          to: {
            type: String,
            default: '/what-we-do'
          }
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('HeroSlider', heroSliderSchema);
