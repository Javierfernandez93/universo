function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      {
        pageLanguage: 'es',
        includedLanguages: 'en,es',
        gaTrack: true,
        gaId: 'UA-XXXXXXXX-X'
      },
      'google_translate_element'
    );
  }