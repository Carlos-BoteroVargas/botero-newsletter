import '../App.css';

const HolidayCard = ({cardContent = "Merry Christmas to all!"}) => {
  const paragraphs = Array.isArray(cardContent)
    ? cardContent
    : cardContent.split('\n\n');

  return (
    <div className="card-wrapper">
      <div className="holiday-card">
        <p style={{paddingBottom: "20px"}}>Dear Family and Friends,</p>
        
        {paragraphs.map((p, i) => <p key={i} style={{paddingBottom: "10px"}}>{p}</p>)}

        <div className="card-signature">
          <p>With love, The Botero Family</p>
          <p>Carlos, Elizabeth, Isabel, Elena, Luca, and baby Juliana.</p>
        </div>
      </div>
    </div>
  );
};

export default HolidayCard;