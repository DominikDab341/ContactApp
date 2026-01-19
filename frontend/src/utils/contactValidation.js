export const validateContact = (formData) => {
  const newErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+\d{2}\d{9}$/;

  if (!formData.first_name?.trim()) newErrors.first_name = 'Imię jest wymagane';
  if (!formData.last_name?.trim()) newErrors.last_name = 'Nazwisko jest wymagane';

  if (!formData.email?.trim()) {
    newErrors.email = 'Email jest wymagany';
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = 'Niepoprawny format adresu email';
  }

  if (!formData.phone_number?.trim()) {
    newErrors.phone_number = 'Numer telefonu jest wymagany';
  } else {
    const cleanPhone = formData.phone_number.replace(/[\s-]/g, '');

    if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone_number = 'Wymagany format: +XX YYYYYYYYY';
    }
  }

  if (!formData.town?.trim()) newErrors.town = 'Miasto jest wymagane';

  if (formData.status !== undefined && !formData.status) {
    newErrors.status = 'Status jest wymagany';
  }

  return newErrors;
};