import React from "react";

const SwipeCard = ({ item, category }) => {
  return (
    <div className="sw-card">
      <div className="sw-card__hero">
        <div className="sw-card__emoji">{item.image || "🧑‍🎓"}</div>
      </div>

      <div className="sw-card__body">
        <h3 className="sw-card__title">{item.name}</h3>

        {category === "friends" && (
          <>
            <p className="sw-card__meta">
              {item.major} • {item.year}
            </p>
            <p className="sw-card__text">{item.bio}</p>
            {item.instagram && (
              <p className="sw-card__link">📷 {item.instagram}</p>
            )}
            {item.twitter && <p className="sw-card__link">𝕏 {item.twitter}</p>}
            {item.linkedin && <p className="sw-card__link">in {item.linkedin}</p>}
          </>
        )}

        {category === "clubs" && (
          <>
            <p className="sw-card__meta">
              {item.category} • {item.members} members
            </p>
            <p className="sw-card__text">{item.description}</p>
            <p className="sw-card__link">🗓 {item.meetingTime}</p>
          </>
        )}

        {category === "events" && (
          <>
            <p className="sw-card__meta">
              {item.date} • {item.attendees} attending
            </p>
            <p className="sw-card__text">{item.description}</p>
            <p className="sw-card__link">📍 {item.location}</p>
          </>
        )}

        {category === "studyGroups" && (
          <>
            <p className="sw-card__meta">
              {item.course} • {item.members} members
            </p>
            <p className="sw-card__text">{item.description}</p>
            <p className="sw-card__link">📖 {item.meetingTime}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SwipeCard;
