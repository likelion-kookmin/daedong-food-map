import React, { useCallback, useEffect, useState } from 'react';
import useInput from 'hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INQUIRIES_REQUEST } from 'reducers/inquiry';
import styled from 'styled-components';
import { Modal, Form } from 'semantic-ui-react';
import { media } from 'utils/style.util';

const InquiryModal = styled(Modal)`
  max-width: 35rem;
  ${media.tablet`
      max-width: 60%;
      min-width: 60%;
    `};
`;

const Field = styled(Form.Field)`
  display: flex;
  flex-direction: column;
  font-family: 'NS-R';
  margin-bottom: 2rem !important;

  label {
    font-weight: bold;
    padding-bottom: 0.3rem;
  }

  input {
    font-family: 'NS-R' !important;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.3rem 2rem;
  border-bottom: 1px solid #d6d6d6;
`;

const BtnText = styled.div`
  font-family: 'NS-R';
  cursor: pointer;
`;

const ModalTitle = styled.div`
  font-family: 'NS-EB';
  font-size: 1.5rem;
`;

const Section = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 1rem;
  gap: 0.2rem;
`;

const Text = styled.div`
  font-family: 'NS-R';
  font-size: 1rem;
  color: #3e3e3e;
`;

//admin에서 카테고리에 추가해 줄 것
const options = [
  { key: 1, text: '장소명', value: '1' },
  { key: 2, text: '위치', value: '2' },
  { key: 3, text: '태그', value: '3' },
  { key: 4, text: '사진', value: '4' },
  { key: 4, text: '그 외 기타', value: '5' },
];
const NewInquiryModal = (props) => {
  const [category, setCategory] = useState('');
  const [contents, onChangeContents, setContents] = useInput('');
  const dispatch = useDispatch();
  const { addInquiriesDone, addInquiriesError } = useSelector((state) => state.inquiry);
  const [categoryError, setCategoryError] = useState('');
  const [contentsError, setContentsError] = useState('');

  useEffect(() => {
    if (addInquiriesError) {
      const { inquiries, nonFieldErrors } = addInquiriesError;
      console.log(inquiries);
      if (nonFieldErrors) {
        // 에러
      }
    }

    if (addInquiriesDone) {
      closeModal();
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addInquiriesError, addInquiriesDone]);

  const closeModal = () => {
    setCategory('');
    setContents('');
    props.setOpen(false);
  };

  const handleChangeCategory = (e, { value }) => {
    setCategory(value);
  };

  const handleSubmit = useCallback(() => {
    dispatch({
      type: ADD_INQUIRIES_REQUEST,
      data: {
        place_id: props.id,
        content: contents,
        category: category,
      },
    });
  }, [dispatch, props.id, contents, category]);

  return (
    <InquiryModal onClose={() => closeModal()} onOpen={() => props.setOpen(true)} open={props.open}>
      <ModalHeader>
        <BtnText onClick={() => closeModal()}>취소</BtnText>
        <ModalTitle>신고하기</ModalTitle>
        <BtnText style={{ color: '#0475F4' }} onClick={handleSubmit}>
          보내기
        </BtnText>
      </ModalHeader>
      <Modal.Content scrolling style={{ maxHeight: '50vh', fontFamily: 'NS-R' }}>
        <Form>
          <Section style={{ marginBottom: '2rem' }}>
            <Text style={{ fontSize: '1.4rem', fontFamily: 'NS-EB' }}>장소에 문제가 있어요.</Text>
          </Section>
          <Field
            fluid
            placeholder="카테고리를 선택하세요."
            // value={category}/
            onChange={handleChangeCategory}
            label="어디에 문제가 있나요?"
            clearable
            options={options}
            selection
            control={Form.Dropdown}
          />
          <Field fluid>
            <label>신고 내용</label>
            <Form.TextArea
              placeholder="장소에 대한 설명을 적어주세요."
              value={contents}
              onChange={onChangeContents}
              style={{ fontFamily: 'NS-R' }}
            />
          </Field>
        </Form>
      </Modal.Content>
    </InquiryModal>
  );
};

export default NewInquiryModal;
