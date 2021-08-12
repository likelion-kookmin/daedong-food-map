import React, { useEffect } from 'react';
import { LOAD_REPORTS_REQUEST } from 'reducers/report';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import { media } from 'utils/style.util';

import ReportCard from 'components/Report/reportCard';

const Section = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 1rem;
  gap: 0.2rem;
`;

const Name = styled.div`
  font-family: 'NS-EB';
  font-size: 2rem;
  color: #3e3e3e;

  ${media.phone`
    font-size: 1.7rem;
  `};
`;

const ReportListPage = () => {
  const dispatch = useDispatch();
  const { reports, loadReportsLoading } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch({
      type: LOAD_REPORTS_REQUEST,
    });
  }, [dispatch]);

  return (
    <div>
      <Section style={{ margin: '1.5rem 0 3rem  0' }}>
        <Name>나의 제보내역</Name>
      </Section>
      {loadReportsLoading ? (
        <Dimmer active inverted>
          <Loader size="huge">Loading</Loader>
        </Dimmer>
      ) : (
        <Grid stackable columns={2}>
          {reports.map((report) => (
            <ReportCard report={report} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ReportListPage;
