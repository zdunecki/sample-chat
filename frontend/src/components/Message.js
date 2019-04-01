import React from 'react';

const zeroAdditive = (i) => i < 10 ? `0${i}` : i;

const formattedDate = d => [
    [d.getFullYear(), '-'],
    [(d.getMonth() + 1), '-'],
    [d.getDate(), ' '],
    [d.getHours(), ':'],
    [d.getMinutes(), '']
]
    .map(([before, after]) => `${zeroAdditive(before)}${after}`)
    .join('');

export const Message = ({messageFrom, data, isMine, startsSequence, endsSequence, showTimestamp}) => {
    return (
        (
            <div className={[
                'message',
                `${isMine ? 'mine' : ''}`,
                `${startsSequence ? 'start' : ''}`,
                `${endsSequence ? 'end' : ''}`
            ].join(' ')}>
                {
                    showTimestamp &&
                    <div className="timestamp">
                        {formattedDate(new Date(data.createdAt))}
                    </div>
                }

                <div className="bubble-container">
                    <div className="bubble-message-container">
                        <span className="message-from">{messageFrom}</span>
                        <div className="bubble">
                            {data.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    )
};