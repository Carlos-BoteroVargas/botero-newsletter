import '../App.css';

const HolidayCard = ({cardContent = "Merry Christmas to all!"}) => {
  return (
    <div className="card-wrapper">
      <div className="holiday-card">
        <p>Dear Family and Friends,</p>
        
        <p>
          {cardContent}
        </p>

        <div className="card-signature">
          <p>Love and prayers,</p>
          <p>Juliana, Luca, Elena, Isabel, Elizabeth, and Carlos.</p>
        </div>
      </div>
    </div>
  );
};

export default HolidayCard;