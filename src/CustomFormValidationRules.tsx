export default function validate(values: any) {
  let errors: any = {};
  if (!values.amount && (values.amount === 0 || values.amount === '')) {
    errors.amount = 'Tutar boş geçilemez';
  }
  return errors;
}
