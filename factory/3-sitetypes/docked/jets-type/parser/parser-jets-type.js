import { ParserEngine } from '../../../5-engine/parser-engine.js';

export class JetsTypeParser extends ParserEngine {
    constructor() {
        super('jets-type');
    }

    async customParsing(data) {
        // Here we could add extra transformations if needed.
        return data;
    }
}
