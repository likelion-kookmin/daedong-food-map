import React, { useState } from 'react';
import { Modal, Grid, Form, Label, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { media } from 'utils/style.util';
import useInput from 'hooks/useInput';

const ReportModal = styled(Modal)`
  max-width: 35rem;
  ${media.tablet`
      max-width: 60%;
      min-width: 60%;
    `};
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

const Field = styled(Form.Field)`
  font-family: 'NS-R';
  margin-bottom: 2rem !important;

  input {
    font-family: 'NS-R' !important;
  }
`;

const Tagcontainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
  margin-top: -1rem;
  margin-bottom: 2rem;
`;
const NewReportModal = (props) => {
  const [step, setStep] = useState(0);
  const [placename, onChangePlacename] = useInput('');
  const [address, onChangeAddress, setAddress] = useInput('');
  const [detailAddress, onChangeDetailAddress, setDetailAddress] = useInput('');
  const [inputTag, onChangeInputTag, setInputTag] = useInput('');
  const [tags, setTags] = useState([]);
  const [contents, onChangeContents] = useInput('');

  const handleInputTag = (e) => {
    if (e.keyCode === 13 && tags.find((element) => element === inputTag) === undefined) {
      setTags([...tags, inputTag]);
      setInputTag('');
    }
  };

  const deleteTag = (e) => {
    const value = e.target.parentElement.id;
    setTags(tags.filter((tag) => tag !== value));
  };

  const handleSubmit = () => {
    console.log(placename, tags, contents);
    props.setOpen(false);
  };

  return (
    <ReportModal
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
    >
      <ModalHeader>
        <BtnText onClick={() => props.setOpen(false)}>취소</BtnText>
        <ModalTitle>제보하기</ModalTitle>
        <BtnText onClick={handleSubmit}>보내기</BtnText>
      </ModalHeader>
      <Modal.Content scrolling style={{ maxHeight: '50vh', fontFamily: 'NS-R' }}>
        {step === 0 ? (
          <Form>
            <Grid.Column>
              <Field
                fluid
                value={placename}
                onChange={onChangePlacename}
                label="장소명 *"
                control={Form.Input}
              />
              {/* 여기 postcode에 따라 바뀌도록 처리해야함 */}
              <Field fluid>
                <label>위치 *</label>
                <Form.Input icon="angle right" value={address} onChange={address} />
                <Form.Input value={detailAddress} onChange={detailAddress} />
              </Field>
              <Field
                fluid
                value={inputTag}
                onChange={onChangeInputTag}
                onKeyDown={handleInputTag}
                label="태그 *"
                icon="plus"
                control={Form.Input}
              />
              <Tagcontainer>
                {tags.map((tag) => (
                  <Label style={{ margin: 0 }} id={tag}>
                    {tag}
                    <Icon name="delete" onClick={deleteTag} />
                  </Label>
                ))}
              </Tagcontainer>
              <Field fluid>
                <label>장소설명</label>
                <Form.TextArea
                  value={contents}
                  onChange={onChangeContents}
                  style={{ fontFamily: 'NS-R' }}
                />
              </Field>
              <Field fluid>
                <label>사진 첨부</label>
                <label style={{ fontWeight: 'normal', fontSize: '0.8rem', color: '#a1a1a1' }}>
                  장소에 대한 사진이 있다면 추가해주세요!
                </label>
                <Form.Button
                  fluid
                  basic
                  color="blue"
                  content="사진첨부"
                  icon="camera"
                  style={{ padding: '1rem 0', fontFamily: 'Ns-R' }}
                />
              </Field>
              <div>이미지영역</div>
              <Form.Checkbox label="이미지 저작권 동의*" />
            </Grid.Column>
          </Form>
        ) : step === 1 ? (
          <div>1</div>
        ) : (
          <div>2</div>
        )}
      </Modal.Content>
    </ReportModal>
  );
};

export default NewReportModal;
