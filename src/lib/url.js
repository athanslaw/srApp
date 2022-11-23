// import env from '../config/env.config.js';
import env from '../config/env.config.js';

export const baseUrl = env().baseUrl;
export const version = env().version;

//----AUTH URLS----//
export const login = `${baseUrl}/api/v${version}/login`;

//----STATE URLS----//
export const getState = `${baseUrl}/api/v${version}/state`;

//----LGA URLS----//
export const getLga = `${baseUrl}/api/v${version}/lga`;

//----WARD URLS----//
export const getWard = `${baseUrl}/api/v${version}/ward`;

//----POLLING UNIT URLS----//
export const getPollingUnit = `${baseUrl}/api/v${version}/polling-unit`;

//----POLITICAL PARTY URLS----//
export const politicalPartiesByState = `${baseUrl}/api/v${version}/political-party/state`;

//----AGENT URLS----//
export const getAgentByPhone = `${baseUrl}/api/v${version}/party-agent/phone/`;

//----RESULT URLS----//
export const createResult = `${baseUrl}/api/v${version}/result`;
export const result = `${baseUrl}/api/v${version}/result`;
export const getResultById = `${baseUrl}/api/v${version}/result`;
export const updateResult = `${baseUrl}/api/v${version}/result`;
export const deleteResult = `${baseUrl}/api/v${version}/result/delete`;
export const getResultsByWard = `${baseUrl}/api/v${version}/result/filter/ward`;
export const getResultsByPollingUnit = `${baseUrl}/api/v${version}/result/filter/polling-unit`;

//----INCIDENT URLS----//
export const incidentsBase = `${baseUrl}/api/v${version}/incident`;

export const uploadIncident = `${baseUrl}/api/v${version}/incident/upload`;

//---- VOTING LEVELS URLS----//
export const allVotingLevels = `${baseUrl}/api/v${version}/voting-level/all`;
export const events = `${baseUrl}/api/v${version}/event/active`;
export const eventRecords = `${baseUrl}/api/v${version}/event-record`;

//---- INCIDENT LEVELS URLS----//
export const allIncidentLevels = `${baseUrl}/api/v${version}/incident-level/all`;

//---- INCIDENT TYPES URLS----//
export const allIncidentTypes = `${baseUrl}/api/v${version}/incident-type/all`;

//---- DASHBOARD URLS----//
export const electionTypes = `${baseUrl}/api/v${version}/election-types`;