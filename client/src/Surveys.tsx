import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Todo: Generate types file.
type Survey = {
  id: string;
  title: string;
  totalResponses: number;
}

const SURVEYS = gql`
  query Surveys {
    surveys {
      id
      title
      totalResponses
    }
  }
`;

const Surveys: React.FC = () => {
  const { loading, error, data } = useQuery(SURVEYS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  
  return data.surveys.map(({ id, title, totalResponses }: Survey) => (
    <div key={id}>
      <p>
        {id}: {title} | {totalResponses}
      </p>
    </div>
  ));
};

export default Surveys;