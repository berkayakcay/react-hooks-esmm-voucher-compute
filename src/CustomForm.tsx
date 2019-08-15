import React, { useState } from 'react';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import CustomFormResultModal from './CustomFormResultModal';
import validate from './CustomFormValidationRules';
import useForm from './useForm';

export interface CustomFormType {
  // stoppageType: string;ı9
  calculationAmountType: string;
  stoppageRate: string;
  vatRate: string;
  amount: number;
}

const CustomForm = () => {
  const [modal, setModal] = useState(false);
  const { handleSubmit, handleReset, handleChange, values, errors } = useForm(formSubmitCallback, validate, {
    // stoppageType: 'stoppage',
    calculationAmountType: 'netAmount',
    stoppageRate: '20',
    vatRate: '1',
    amount: 0
  });

  function formSubmitCallback() {
    setModal(true);
  }

  const onKeyPressAmount = (e: any) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue)) {
      e.preventDefault();
    }
  };

  return (
    <React.Fragment>
      <Form noValidate validated={errors === null} onSubmit={handleSubmit} onReset={handleReset}>
        <Card>
          <Card.Header>Makbuz Bilgileri</Card.Header>
          <Card.Body>
            {/* <Form.Group controlId="validationStoppageType">
            <Form.Label>Stopajlı/Stopajsız</Form.Label>
            <Form.Control as="select" name="stoppageType" onChange={handleChange} value={values.stoppageType || ''}>
              <option value="stoppage" label="STOPAJLI" />
              <option value="non-stoppage" label="STOPAJSIZ" />
            </Form.Control>
          </Form.Group> */}
            <Form.Group controlId="validationCalculationAmountType">
              <Form.Label>Hesaplama Tipi</Form.Label>
              <Form.Control
                as="select"
                name="calculationAmountType"
                onChange={handleChange}
                value={values.calculationAmountType || ''}
              >
                <option value="grossAmount" label="BÜRÜT TUTAR ÜZERİNDEN" />
                <option value="netAmount" label="NET TUTAR ÜZERİNDEN" />
                <option value="payableAmount" label="TAHSİL EDİLEN ÜZERİNDEN" />
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="validationstoppageRate">
              <Form.Label>Stopaj Oranı %</Form.Label>
              <Form.Control as="select" name="stoppageRate" onChange={handleChange} value={values.stoppageRate || ''}>
                <option value="0" label="0 %" />
                <option value="20" label="20 %" />
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="validationVatRate">
              <Form.Label>KDV Oranı %</Form.Label>
              <Form.Control as="select" name="vatRate" onChange={handleChange} value={values.vatRate || ''}>
                <option value="1" label="1 %" />
                <option value="8" label="8 %" />
                <option value="18" label="18 %" />
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="validationAmount">
              <Form.Label>Tutar</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>TL</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  name="amount"
                  value={values.amount || ''}
                  onChange={handleChange}
                  onKeyPress={onKeyPressAmount}
                  isInvalid={(errors as any).amount}
                />
                <Form.Control.Feedback type="invalid">Lütfen tutar giriniz.</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Button variant="outline-success" type="submit">
              HESAPLA
            </Button>
            <Button variant="outline-secondary" type="reset">
              SIFIRLA
            </Button>
          </Card.Footer>
        </Card>
      </Form>
      <CustomFormResultModal show={modal} onHide={() => setModal(false)} values={values} />
    </React.Fragment>
  );
};

export default CustomForm;
