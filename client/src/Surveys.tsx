import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Surveys } from './__generated__/Surveys';

// Todo: Generate types file.
// type Survey = {
//   id: string;
//   title: string;
//   totalResponses: number;
// }

const SURVEYS = gql`
  query Surveys {
    surveys {
      id
      title
      totalResponses
    }
  }
`;

const SurveyList: React.FC = () => {
  const { loading, error, data } = useQuery<Surveys>(SURVEYS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  const { surveys } = data!;
  
  return (
    <div>
      {surveys.map(({ id, title, totalResponses }) => (
        <div key={id}>
          <p>
            {id}: {title} | {totalResponses}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SurveyList;