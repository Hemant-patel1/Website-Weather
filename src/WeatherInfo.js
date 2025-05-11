import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function WeatherInfo(promps){
    return (
      <div className="block rounded-lg bg-primary_light_mode p-4 shadow-sm shadow-indigo-100">
        <div className="flex items-center gap-4">
          {promps.icon && <FontAwesomeIcon icon={promps.icon} size="2x" />}
          {promps.image && (
            <img
              src={promps.image}
              alt={promps.title}
              className="rounded-full object-cover shadow-sm"
            />
          )}
          <div>
            <h3 className="text-gray-700 font-bold">{promps.title}</h3>
            <p className="mt-1 text-xs font-medium text-primary_text_light_mode">
              {promps.value}
            </p>
            {promps.description && (
              <p className="mt-1 text-xs text-gray-500">{promps.description}</p>
            )}
          </div>
        </div>
      </div>
    );
};

export default WeatherInfo
