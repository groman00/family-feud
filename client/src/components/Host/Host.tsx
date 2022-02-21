import React, { useContext } from 'react';
import { GameContext, GameStatus } from '../../contexts/GameContext';
import { useGiveStrikeMutation, useRevealAnswerMutation, useStartGameMutation } from '../../graphql/generated/types';
import { useSelector } from '../../hooks';
import { getGameToken, getPlayers, getSurvey } from '../../store';
import Answers from '../Answers';

const Lobby: React.FC = () => {
  const { status } = useContext(GameContext);
  const [startGame] = useStartGameMutation();
  const token = useSelector(getGameToken);

  return (
    <>
      <h2>Lobby:</h2>
      <ul>
        { useSelector(getPlayers)?.map(player => <li key={player.name}>{player.name}</li>)}
        { status === GameStatus.NotStarted && (
        <button
          type="button"
          onClick={() => {
            startGame({
              variables: {
                token,
              },
            });
          }}
        >
          Start Game
        </button>
        )}
      </ul>
    </>
  );
};

const Survey: React.FC = () => {
  const token = useSelector(getGameToken);
  const { hasEnded } = useContext(GameContext);
  const survey = useSelector(getSurvey);
  const [revealAnswer] = useRevealAnswerMutation();
  const [giveStrike] = useGiveStrikeMutation();

  if (!survey) {
    return null;
  }

  return (
    <>
      <Answers>
        {({ id, revealed, text }) => (
          <button
            type="button"
            disabled={hasEnded || revealed}
            onClick={e => {
              revealAnswer({
                variables: {
                  token,
                  answerId: id,
                },
              });
            }}
          >
            {text}
          </button>
        )}
      </Answers>
      {
        hasEnded ? (
          <div>
            <h2>Round Over</h2>
            <button
              type="button"
              onClick={() => {
                alert('coming soon!');
              }}
            >
              Start Next Round
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              giveStrike({
                variables: {
                  surveyId: survey.id,
                },
              });
            }}
          >
            STRIKE
          </button>
        )
      }
    </>
  );
};

const Host: React.FC = () => {
  const token = useSelector(getGameToken);
  const survey = useSelector(getSurvey);

  return (
    <div>
      <h1>Host</h1>
      <h2>
        Game Token:
        {' '}
        {token}
      </h2>
      { survey ? <Survey /> : <Lobby />}
    </div>
  );
};

export default Host;
