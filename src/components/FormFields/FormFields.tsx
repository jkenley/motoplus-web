import { FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import React from 'react';

import { FormFieldsProps } from '@/types/index';

const FormFields: React.FC<FormFieldsProps> = ({ values, errors, handleChange, qrCode }) => {
  return (
    <>
      <FormControl isInvalid={!!errors.store}>
        <FormLabel htmlFor="store">Nombre de la tienda</FormLabel>
        <Input type="text" id="store" name="store" value={values.store} onChange={handleChange} />
        {errors.store && <FormErrorMessage>{errors.store}</FormErrorMessage>}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="qrCode">Código QR</FormLabel>
        <Input id="qrCode" value={qrCode} disabled />
      </FormControl>

      <FormControl isInvalid={!!errors.fullName}>
        <FormLabel htmlFor="fullName">Nombre completo</FormLabel>
        <Input type="text" id="fullName" name="fullName" value={values.fullName} onChange={handleChange} />
        {errors.fullName && <FormErrorMessage>{errors.fullName}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={!!errors.phoneNumber}>
        <FormLabel htmlFor="phoneNumber">Número de teléfono</FormLabel>
        <Input type="tel" id="phoneNumber" name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
        {errors.phoneNumber && <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>}
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="note">Dejar una nota</FormLabel>
        <Textarea
          id="note"
          name="note"
          rows={5}
          placeholder="Deje una nota (opcional)"
          value={values.note}
          onChange={handleChange}
        />
        {errors.note && <FormErrorMessage>{errors.note}</FormErrorMessage>}
      </FormControl>
    </>
  );
};

export default FormFields;
