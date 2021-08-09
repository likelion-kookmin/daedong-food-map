import React, { useEffect } from 'react';
import { LOAD_REPORTS_REQUEST } from 'reducers/report';

import { useDispatch, useSelector } from 'react-redux';
import { Divider, Segment, Dimmer, Loader } from 'semantic-ui-react';

import ReportCard from 'components/Report/reportCard';

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
      <h1>제보 목록</h1>
      <Divider />
      {loadReportsLoading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader size="huge">Loading</Loader>
          </Dimmer>
        </Segment>
      ) : (
        <Segment.Group>
          {reports.map((report) => (
            <ReportCard report={report} />
          ))}
        </Segment.Group>
      )}
    </div>
  );
};

export default ReportListPage;
