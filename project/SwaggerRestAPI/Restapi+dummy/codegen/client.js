/// <reference path="../../typings/tsd.d.ts" />

import * as request from "superagent";
import {
    SuperAgentStatic
} from "superagent";

type CallbackHandler = (err: any, res ? : request.Response) => void;
type TOUR = {
    'tourname' ? : string

    'time' ? : string

    'cities' ? : Cities

};
type Cities = {
    'cityname' ? : string

    'comments' ? : string

    'photos' ? : Array < {
            'photoUrl' ? : string

        } >
        | {
            'photoUrl' ? : string

        }

};
type Error = {
    'message': string

};

type Logger = {
    log: (line: string) => any
};

/**
 * 
 * @class ProductService
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export default class ProductService {

    private domain: string = "http://localhost:10010/api/v1";
    private errorHandlers: CallbackHandler[] = [];

    constructor(domain ? : string, private logger ? : Logger) {
        if (domain) {
            this.domain = domain;
        }
    }

    getDomain() {
        return this.domain;
    }

    addErrorHandler(handler: CallbackHandler) {
        this.errorHandlers.push(handler);
    }

    private request(method: string, url: string, body: any, headers: any, queryParameters: any, form: any, reject: CallbackHandler, resolve: CallbackHandler) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        let req = (request as SuperAgentStatic)(method, url).query(queryParameters);

        Object.keys(headers).forEach(key => {
            req.set(key, headers[key]);
        });

        if (body) {
            req.send(body);
        }

        if (typeof(body) === 'object' && !(body.constructor.name === 'Buffer')) {
            req.set('Content-Type', 'application/json');
        }

        if (Object.keys(form).length > 0) {
            req.type('form');
            req.send(form);
        }

        req.end((error, response) => {
            if (error || !response.ok) {
                reject(error);
                this.errorHandlers.forEach(handler => handler(error));
            } else {
                resolve(response);
            }
        });
    }

    createTourURL(parameters: {
        'body': TOUR,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour';

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * This can only be done by the logged in user.
     * @method
     * @name ProductService#createTour
     * @param {} body - Created tour object
     */
    createTour(parameters: {
        'body': TOUR,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters['body'] !== undefined) {
                body = parameters['body'];
            }

            if (parameters['body'] === undefined) {
                reject(new Error('Missing required  parameter: body'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getTourByNameURL(parameters: {
        'tourname': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour/{tourname}';

        path = path.replace('{tourname}', `${parameters['tourname']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Get tour by tourname
     * @method
     * @name ProductService#getTourByName
     * @param {string} tourname - The tour that needs to be fetched.
     */
    getTourByName(parameters: {
        'tourname': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour/{tourname}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{tourname}', `${parameters['tourname']}`);

            if (parameters['tourname'] === undefined) {
                reject(new Error('Missing required  parameter: tourname'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    updateTourURL(parameters: {
        'tourname': string,
        'body': TOUR,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour/{tourname}';

        path = path.replace('{tourname}', `${parameters['tourname']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * This can only be done by the logged in user
     * @method
     * @name ProductService#updateTour
     * @param {string} tourname - Tour name that need to be updated
     * @param {} body - Updated tour object
     */
    updateTour(parameters: {
        'tourname': string,
        'body': TOUR,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour/{tourname}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{tourname}', `${parameters['tourname']}`);

            if (parameters['tourname'] === undefined) {
                reject(new Error('Missing required  parameter: tourname'));
                return;
            }

            if (parameters['body'] !== undefined) {
                body = parameters['body'];
            }

            if (parameters['body'] === undefined) {
                reject(new Error('Missing required  parameter: body'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deleteTourURL(parameters: {
        'tourname': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour/{tourname}';

        path = path.replace('{tourname}', `${parameters['tourname']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * This can only be done by the logged in user
     * @method
     * @name ProductService#deleteTour
     * @param {string} tourname - The tour that needs to be deleted
     */
    deleteTour(parameters: {
        'tourname': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour/{tourname}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{tourname}', `${parameters['tourname']}`);

            if (parameters['tourname'] === undefined) {
                reject(new Error('Missing required  parameter: tourname'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    GetPointURL(parameters: {
        'tourname': string,
        'citiesname': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour/{tourname}/{citiesname}';

        path = path.replace('{tourname}', `${parameters['tourname']}`);

        path = path.replace('{citiesname}', `${parameters['citiesname']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Returns a single info about event
     * @method
     * @name ProductService#GetPoint
     * @param {string} tourname - The tour that needs to be fetched.
     * @param {string} citiesname - The city name that needs to be fetched.
     */
    GetPoint(parameters: {
        'tourname': string,
        'citiesname': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour/{tourname}/{citiesname}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{tourname}', `${parameters['tourname']}`);

            if (parameters['tourname'] === undefined) {
                reject(new Error('Missing required  parameter: tourname'));
                return;
            }

            path = path.replace('{citiesname}', `${parameters['citiesname']}`);

            if (parameters['citiesname'] === undefined) {
                reject(new Error('Missing required  parameter: citiesname'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    UpdateInfoPointURL(parameters: {
        'tourname': string,
        'citiesname': string,
        'body': Array < Cities >
            | Cities

            ,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour/{tourname}/{citiesname}';

        path = path.replace('{tourname}', `${parameters['tourname']}`);

        path = path.replace('{citiesname}', `${parameters['citiesname']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Update info about event on this point
     * @method
     * @name ProductService#UpdateInfoPoint
     * @param {string} tourname - Tour name that need to be updated
     * @param {string} citiesname - City name that need to be updated
     * @param {} body - Updated city object
     */
    UpdateInfoPoint(parameters: {
        'tourname': string,
        'citiesname': string,
        'body': Array < Cities >
            | Cities

            ,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour/{tourname}/{citiesname}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{tourname}', `${parameters['tourname']}`);

            if (parameters['tourname'] === undefined) {
                reject(new Error('Missing required  parameter: tourname'));
                return;
            }

            path = path.replace('{citiesname}', `${parameters['citiesname']}`);

            if (parameters['citiesname'] === undefined) {
                reject(new Error('Missing required  parameter: citiesname'));
                return;
            }

            if (parameters['body'] !== undefined) {
                body = parameters['body'];
            }

            if (parameters['body'] === undefined) {
                reject(new Error('Missing required  parameter: body'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('PUT', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    deletePointURL(parameters: {
        'tourname': string,
        'citiesname': string,
        $queryParameters ? : any,
        $domain ? : string
    }): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour/{tourname}/{citiesname}';

        path = path.replace('{tourname}', `${parameters['tourname']}`);

        path = path.replace('{citiesname}', `${parameters['citiesname']}`);

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                queryParameters[parameterName] = parameters.$queryParameters[parameterName];
            });
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Delete point
     * @method
     * @name ProductService#deletePoint
     * @param {string} tourname - The tour that needs to be deleted
     * @param {string} citiesname - City name that need to be deleted
     */
    deletePoint(parameters: {
        'tourname': string,
        'citiesname': string,
        $queryParameters ? : any,
        $domain ? : string
    }): Promise < request.Response > {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/tour/{tourname}/{citiesname}';
        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/xml, application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{tourname}', `${parameters['tourname']}`);

            if (parameters['tourname'] === undefined) {
                reject(new Error('Missing required  parameter: tourname'));
                return;
            }

            path = path.replace('{citiesname}', `${parameters['citiesname']}`);

            if (parameters['citiesname'] === undefined) {
                reject(new Error('Missing required  parameter: citiesname'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('DELETE', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

}
