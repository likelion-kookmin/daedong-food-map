import React, { useState, useRef } from 'react';
import { Modal, Grid, Form, Label, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { media } from 'utils/style.util';
import useInput from 'hooks/useInput';
import PostCode from './PostCode';

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

const ImgContainer = styled.div`
  display: inline-block;
  width: 25%;
  position: relative;
  padding-bottom: 25%;
  margin-top: 1rem;
  margin-right: 1rem;
`;

const Img = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
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
  const [placename, onChangePlacename, setPlacename] = useInput('');
  const [address, onChangeAddress, setAddress] = useInput('');
  const [detailAddress, onChangeDetailAddress, setDetailAddress] = useInput('');
  const [inputTag, onChangeInputTag, setInputTag] = useInput('');
  const [contents, onChangeContents, setContents] = useInput('');
  const [tags, setTags] = useState([]);
  const [imgs, setImgs] = useState([]);

  const inputFile = useRef(null);

  const closeModal = () => {
    setStep(0);
    setPlacename('');
    setAddress('');
    setDetailAddress('');
    setInputTag('');
    setTags([]);
    setContents('');
    setImgs([]);
    props.setOpen(false);
  };

  const handleInputTag = (e) => {
    if (
      e.keyCode === 13 &&
      inputTag.trim() !== '' &&
      tags.find((element) => element === inputTag) === undefined
    ) {
      setTags([...tags, inputTag]);
      setInputTag('');
    }
  };
  const deleteTag = (e) => {
    const value = e.target.parentElement.id;
    setTags(tags.filter((tag) => tag !== value));
  };

  const deleteImg = (e) => {
    const value = e.target.parentElement.id;
    setImgs(imgs.filter((img) => img !== imgs[value]));
  };

  const handleInputFile = (e) => {
    e.preventDefault();
    inputFile.current.click();
  };

  const upload = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgs([...imgs, base64.toString()]);
      }
    };
    const imgTarget = e.target.files;
    if (imgTarget[0]) {
      reader.readAsDataURL(imgTarget[0]);
    }
  };

  const handleSubmit = () => {
    console.log(placename, tags, contents);
    closeModal();
  };

  return (
    <ReportModal onClose={() => closeModal()} onOpen={() => props.setOpen(true)} open={props.open}>
      <ModalHeader>
        <BtnText onClick={() => closeModal()}>취소</BtnText>
        <ModalTitle>제보하기</ModalTitle>
        <BtnText onClick={handleSubmit}>보내기</BtnText>
      </ModalHeader>
      {step === 0 ? (
        <Modal.Content scrolling style={{ maxHeight: '50vh', fontFamily: 'NS-R' }}>
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
              <Form.Input
                fluid
                placeholder="도로명주소 찾기"
                icon="angle right"
                value={address}
                onClick={() => setStep(1)}
              />
              {address === '' ? null : (
                <Form.Input
                  fluid
                  placeholder="상세주소"
                  value={detailAddress}
                  onChange={onChangeDetailAddress}
                  style={{ marginTop: '0.5rem' }}
                />
              )}
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <label>장소설명</label>
                {/* <label style={{ fontWeight: 'normal', fontSize: '0.85rem', color: '#a1a1a1' }}>
                  100
                </label> */}
              </div>
              <Form>
                <Form.TextArea
                  placeholder="장소에 대한 설명을 적어주세요."
                  value={contents}
                  onChange={onChangeContents}
                  style={{ fontFamily: 'NS-R' }}
                />
              </Form>
            </Field>
            <Field fluid>
              <label>사진 첨부</label>
              <label style={{ fontWeight: 'normal', fontSize: '0.85rem', color: '#a1a1a1' }}>
                장소에 대한 사진이 있다면 추가해주세요!
              </label>
              <label htmlFor="file">
                <Form.Button
                  fluid
                  basic
                  color="blue"
                  content="사진첨부"
                  icon="camera"
                  onClick={handleInputFile}
                  style={{ padding: '1rem 0', fontFamily: 'NS-R' }}
                />
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                content_type="multipart/form-data"
                ref={inputFile}
                onChange={upload}
                style={{ display: 'none' }}
              />
            </Field>
            <div style={{ whiteSpace: 'nowrap', overflow: 'auto', marginTop: '-2rem' }}>
              {imgs.map((src, index) => (
                <ImgContainer>
                  <Label floating circular id={index} onClick={deleteImg}>
                    <Icon name="delete" style={{ margin: '0', fontSize: '1rem' }} />
                  </Label>
                  <Img src={src} />
                </ImgContainer>
              ))}
            </div>
            {/* <Form.Checkbox label="이미지 저작권 동의 *" /> */}
          </Grid.Column>
        </Modal.Content>
      ) : step === 1 ? (
        <PostCode setAddress={setAddress} setStep={setStep} />
      ) : (
        <div>2</div>
      )}
    </ReportModal>
  );
};

export default NewReportModal;
