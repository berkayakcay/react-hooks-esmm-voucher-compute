import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function CalculateVoucher(values: any) {
  //   let stoppageType = values.stoppageRate === 0 ? 'stoppage' : 'non-stoppage';

  var result = {
    grossAmount: 0,
    stoppageAmount: 0,
    vatAmount: 0,
    netAmount: 0,
    payableAmount: 0
  };

  if (values.calculationAmountType === 'grossAmount') {
    result.grossAmount = parseFloat(values.amount);
    result.stoppageAmount = result.grossAmount * (values.stoppageRate / 100);
    result.vatAmount = result.grossAmount * (values.vatRate / 100);
    result.netAmount = result.grossAmount - result.stoppageAmount;
    result.payableAmount = result.netAmount + result.vatAmount;
  } else if (values.calculationAmountType === 'netAmount') {
    result.netAmount = parseFloat(values.amount);
    result.grossAmount = result.netAmount / (1 - values.stoppageRate / 100);
    result.stoppageAmount = result.grossAmount * (values.stoppageRate / 100);
    result.vatAmount = result.grossAmount * (values.vatRate / 100);
    result.payableAmount = result.netAmount + result.vatAmount;
  } else if (values.calculationAmountType === 'payableAmount') {
    result.payableAmount = parseFloat(values.amount);
    result.grossAmount = result.payableAmount / (1 - values.stoppageRate / 100 + values.vatRate / 100);
    result.stoppageAmount = result.grossAmount * (values.stoppageRate / 100);
    result.vatAmount = result.grossAmount * (values.vatRate / 100);
  }
  return result;
}

function CustomFormResultModal(props: any) {
  const result = CalculateVoucher(props.values);
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Hesaplama Sonucu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {console.log('result', result)}
        {result ? (
          <div style={{ textAlign: 'center' }}>
            {`Brüt :  ${result.grossAmount && result.grossAmount.toFixed(2)} TL`} <br />
            {`Stopaj Oran : ${props.values.stoppageRate} %`} <br />
            {`Gelir Vergisi Stopajı : ${result.stoppageAmount && result.stoppageAmount.toFixed(2)} TL `} <br />
            {`Net : ${result.netAmount && result.netAmount.toFixed(2)} TL `} <br />
            {`KDV Oranı : ${props.values.vatRate} `} <br />
            {`KDV : ${result.vatAmount && result.vatAmount.toFixed(2)} TL `} <br />
            {`Tahsil Edilen : ${result.payableAmount && result.payableAmount.toFixed(2)} TL `}
          </div>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomFormResultModal;
