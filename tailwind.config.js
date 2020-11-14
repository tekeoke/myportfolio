module.exports = {
  purge: [`./src/**/*.js`, `./src/**/*.jsx`, `./src/**/*.ts`, `./src/**/*.tsx`],
  theme: {
    extend: {
      screens: {
        xs: `320px`,
      },
      backgroundImage: theme => ({
        'hero-image': "url('/macbook.jpg')",
      }),
      minHeight: {
        '0': '0',
        '1/4': '25vh',
        '1/2': '50vh',
        '4/5': '80vh',
        '9/10': '90vh',
        'full': '100vh',
        'herofixed': '3rem',
      },
      maxHeight: {
        'fix': '90%',
      }
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
