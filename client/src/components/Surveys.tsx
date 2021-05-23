import React from 'react';
import { useSurveysQuery, Survey } from '../graphql/generated/types';
import SurveyView from './SurveyView';

const SurveyList: React.FC = () => {
  const { loading, error, data } = useSurveysQuery();
  const [selectedSurvey, setSelectedSurvey] = React.useState<Survey>();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  const { surveys } = data!;

  if (selectedSurvey) {
    return <SurveyView survey={selectedSurvey} />;
  }
  
  if (surveys.length === 0) {
    return <p>No Surveys</p>;
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