import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Surveys } from './__generated__/Surveys';
import Survey from './Survey';

const SURVEYS = gql`
  query Surveys {
    surveys {
      id
      title
      totalAnswers
      answers {
        id
        text
        count
        rank
      }
    }
  }
`;

const SurveyList: React.FC = () => {
  const { loading, error, data } = useQuery<Surveys>(SURVEYS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  const { surveys } = data!;
  const [firstSurvey] = surveys;

  return (
    <div>
      {/* {surveys.map(({ id, title, totalResponses }) => (
        <div key={id}>
          <p>
            {id}: {title} | {totalResponses}
          </p>
        </div>
      ))} */}
      <Survey {...firstSurvey} />
    </div>
  );
};

export default SurveyList;