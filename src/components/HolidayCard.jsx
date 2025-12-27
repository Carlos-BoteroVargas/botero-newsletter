import '../App.css';

const HolidayCard = ({cardContent = "Merry Christmas to all!"}) => {
  return (
    <div className="card-wrapper">
      <div className="holiday-card">
        <p style={{paddingBottom: "20px"}}>Dear Family and Friends,</p>
        
        <p>
          {cardContent}
        </p>

        <div className="card-signature">
          <p>With Love,</p>
          <p>With love, The Botero Family Carlos, Elizabeth, Isabel, Elena, Luca, and baby Juliana.</p>
        </div>
      </div>
    </div>
  );
};

export default HolidayCard;