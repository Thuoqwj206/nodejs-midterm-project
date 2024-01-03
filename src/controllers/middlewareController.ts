import { NextFunction } from "express";
import middlewareService from "../services/middlewareService";

export class middlewareController {
    private middlewareService: any
    constructor() {
        this.middlewareService = middlewareService
    }

    public verifyToken = (): NextFunction => {
        return this.middlewareService.verifyToken
    }

    public verifyAdmin = (): NextFunction => {
        return this.middlewareService.verifyAdmin
    }
}