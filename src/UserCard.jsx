import React from 'react';

const UserCard = (props) => {
    return (
        <div className="rounded-2xl bg-white p-5 shadow-md transition hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                    {props.name}
                </h2>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                        props.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                    }`}
                >
                    {props.isActive ? "Online" : "Offline"}
                </span>
            </div>

            <div className="mb-5 space-y-1 text-gray-600">
                <p>Age: {props.age}</p>
                <p>City: {props.city}</p>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={props.onToggle}
                    className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
                        props.isActive
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                    {props.isActive ? "Set Offline" : "Set Online"}
                </button>

                <button
                    onClick={props.onDelete}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default UserCard;