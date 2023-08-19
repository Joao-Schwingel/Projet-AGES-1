import './badge.scss';

interface BadgeProps {
  id: string;
  type: 'active' | 'accepted' | 'transport' | 'done';
}
export const Badge: React.FC<BadgeProps> = ({ type, id }) => {
  let typeDisplay;
  if (type === 'active') typeDisplay = 'Ativo';
  else if (type === 'accepted') typeDisplay = 'Aceito';
  else if (type === 'transport') typeDisplay = 'Em transporte';
  else typeDisplay = 'Encerrado';

  return (
    <div id={id} className={`badge-component badge-color-${type}`}>
      <p>{typeDisplay}</p>
    </div>
  );
};
