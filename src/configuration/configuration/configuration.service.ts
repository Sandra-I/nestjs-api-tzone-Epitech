import { Injectable } from '@nestjs/common';

/**
 * Retrieve the port inside the _process.env_ variable.
 * 
 * If `process.env.PORT` is null, set a default value.
 */
@Injectable()
export class ConfigurationService {
    public port: number | string;

    constructor() {
        this.port = process.env.PORT || 3000
    }
}
