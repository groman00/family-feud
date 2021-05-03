import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Surveys, Surveys_surveys } from './__generated__/Surveys';
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
  const [selectedSurvey, setSelectedSurvey] = React.useState<Surveys_surveys>();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  const { surveys } = data!;

  if (selectedSurvey) {
    return <Survey {...selectedSurvey} />;
  }
  
  return (
    <div>
      {
        surveys.map(survey => (
          <div key={survey.id}>
            <button
              onClick={() => setSelectedSurvey(survey)}
            >
              <h2>{survey.title}</h2>
            </button>
          </div>
        ))
      }
    </div>
  );
};

export default SurveyList;