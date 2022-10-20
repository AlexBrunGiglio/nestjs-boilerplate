"use strict";
/**
 * API template
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferentialService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const encoder_1 = require("../encoder");
// @ts-ignore
const variables_1 = require("../variables");
const configuration_1 = require("../configuration");
let ReferentialService = class ReferentialService {
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://localhost';
        this.defaultHeaders = new http_1.HttpHeaders();
        this.configuration = new configuration_1.Configuration();
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new encoder_1.CustomHttpParameterCodec();
    }
    // @ts-ignore
    addToHttpParams(httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }
    addToHttpParamsRecursive(httpParams, value, key) {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            }
            else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                }
                else {
                    throw Error("key may not be null if value is Date");
                }
            }
            else {
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    referentialControllerDisableAppValues(requestParameters, observe = 'body', reportProgress = false, options) {
        const multipleAppValuesRequest = requestParameters.multipleAppValuesRequest;
        if (multipleAppValuesRequest === null || multipleAppValuesRequest === undefined) {
            throw new Error('Required parameter multipleAppValuesRequest was null or undefined when calling referentialControllerDisableAppValues.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/api/app-types/disableAppValues`;
        return this.httpClient.request('patch', `${this.configuration.basePath}${localVarPath}`, {
            body: multipleAppValuesRequest,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    referentialControllerGetMultipleTypeValues(requestParameters, observe = 'body', reportProgress = false, options) {
        const appTypesCodes = requestParameters.appTypesCodes;
        if (appTypesCodes === null || appTypesCodes === undefined) {
            throw new Error('Required parameter appTypesCodes was null or undefined when calling referentialControllerGetMultipleTypeValues.');
        }
        const start = requestParameters.start;
        const length = requestParameters.length;
        const orderby = requestParameters.orderby;
        const order = requestParameters.order;
        const search = requestParameters.search;
        let localVarQueryParameters = new http_1.HttpParams({ encoder: this.encoder });
        if (start !== undefined && start !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, start, 'start');
        }
        if (length !== undefined && length !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, length, 'length');
        }
        if (orderby !== undefined && orderby !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, orderby, 'orderby');
        }
        if (order !== undefined && order !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, order, 'order');
        }
        if (search !== undefined && search !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, search, 'search');
        }
        if (appTypesCodes !== undefined && appTypesCodes !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, appTypesCodes, 'appTypesCodes');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/api/app-types/getMultipleTypeValues`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            params: localVarQueryParameters,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    referentialControllerGetOneAppType(requestParameters, observe = 'body', reportProgress = false, options) {
        const id = requestParameters.id;
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling referentialControllerGetOneAppType.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/api/app-types/getOneAppType/${this.configuration.encodeParam({ name: "id", value: id, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined })}`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    referentialControllerGetTypeValues(requestParameters, observe = 'body', reportProgress = false, options) {
        const appTypeCode = requestParameters.appTypeCode;
        if (appTypeCode === null || appTypeCode === undefined) {
            throw new Error('Required parameter appTypeCode was null or undefined when calling referentialControllerGetTypeValues.');
        }
        const start = requestParameters.start;
        const length = requestParameters.length;
        const orderby = requestParameters.orderby;
        const order = requestParameters.order;
        const search = requestParameters.search;
        const alsoDisabled = requestParameters.alsoDisabled;
        let localVarQueryParameters = new http_1.HttpParams({ encoder: this.encoder });
        if (start !== undefined && start !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, start, 'start');
        }
        if (length !== undefined && length !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, length, 'length');
        }
        if (orderby !== undefined && orderby !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, orderby, 'orderby');
        }
        if (order !== undefined && order !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, order, 'order');
        }
        if (search !== undefined && search !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, search, 'search');
        }
        if (appTypeCode !== undefined && appTypeCode !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, appTypeCode, 'appTypeCode');
        }
        if (alsoDisabled !== undefined && alsoDisabled !== null) {
            localVarQueryParameters = this.addToHttpParams(localVarQueryParameters, alsoDisabled, 'alsoDisabled');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/api/app-types/getTypeValues`;
        return this.httpClient.request('get', `${this.configuration.basePath}${localVarPath}`, {
            params: localVarQueryParameters,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    referentialControllerInsertOrUpdateAppType(requestParameters, observe = 'body', reportProgress = false, options) {
        const appTypeDto = requestParameters.appTypeDto;
        if (appTypeDto === null || appTypeDto === undefined) {
            throw new Error('Required parameter appTypeDto was null or undefined when calling referentialControllerInsertOrUpdateAppType.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/api/app-types/insertOrUpdateAppType`;
        return this.httpClient.request('post', `${this.configuration.basePath}${localVarPath}`, {
            body: appTypeDto,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    referentialControllerInsertOrUpdateAppValue(requestParameters, observe = 'body', reportProgress = false, options) {
        const appValueDto = requestParameters.appValueDto;
        if (appValueDto === null || appValueDto === undefined) {
            throw new Error('Required parameter appValueDto was null or undefined when calling referentialControllerInsertOrUpdateAppValue.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/api/app-types/insertOrUpdateAppValue`;
        return this.httpClient.request('post', `${this.configuration.basePath}${localVarPath}`, {
            body: appValueDto,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    referentialControllerRemoveAppValues(requestParameters, observe = 'body', reportProgress = false, options) {
        const multipleAppValuesRequest = requestParameters.multipleAppValuesRequest;
        if (multipleAppValuesRequest === null || multipleAppValuesRequest === undefined) {
            throw new Error('Required parameter multipleAppValuesRequest was null or undefined when calling referentialControllerRemoveAppValues.');
        }
        let localVarHeaders = this.defaultHeaders;
        let localVarCredential;
        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set('Authorization', 'Bearer ' + localVarCredential);
        }
        let localVarHttpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }
        let responseType_ = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            }
            else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            }
            else {
                responseType_ = 'blob';
            }
        }
        let localVarPath = `/api/app-types/removeAppValues`;
        return this.httpClient.request('delete', `${this.configuration.basePath}${localVarPath}`, {
            body: multipleAppValuesRequest,
            responseType: responseType_,
            withCredentials: this.configuration.withCredentials,
            headers: localVarHeaders,
            observe: observe,
            reportProgress: reportProgress
        });
    }
};
ReferentialService = __decorate([
    (0, core_1.Injectable)({
        providedIn: 'root'
    }),
    __param(1, (0, core_1.Optional)()),
    __param(1, (0, core_1.Inject)(variables_1.BASE_PATH)),
    __param(2, (0, core_1.Optional)())
], ReferentialService);
exports.ReferentialService = ReferentialService;