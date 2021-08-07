import React from 'react';
import { Modal } from 'semantic-ui-react';

const NewReportModal = (props) => {
  return (
    <Modal onClose={() => props.onClose(false)} onOpen={() => props.onOpen(true)} open={props.open}>
      <Modal.Header>제보하기</Modal.Header>
    </Modal>
  );
};

export default NewReportModal;
