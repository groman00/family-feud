import { Game } from './Game';
import { Host } from './NamedEntity';
import { Round } from './Round';
import { Survey } from './Survey';


const createSurvey = () => {
  const answers = [{ answerRanking: 0 }, { answerRanking: 1 }];
  return new Survey(answers);
};

const createRound = (survey: Survey) => {
  return new Round(survey);
};

const createGame = (): Game => {
  const host: Host = {
    name: 'Steve Harvey'
  };  
  const survey = createSurvey();
  const round = createRound(survey);
  const rounds = []

  return {
    host,
    rounds,
    teams: [],
  };
}
