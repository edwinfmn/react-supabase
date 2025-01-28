import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters long'),
  size: Yup.string()
    .required('Size is required'),
  color: Yup.string()
    .nullable()
    .optional(),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be a positive number')
    .transform((value, originalValue) => originalValue === '' ? undefined : +value.toFixed(2)),
  target: Yup.string()
    .required('Category is required'),
  image: Yup.string()
    .nullable()
    .optional()
});
