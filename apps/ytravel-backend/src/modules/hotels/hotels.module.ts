import { Module } from "@nestjs/common";
import { HotelsController } from "./hotels.controller";
import { HotelsService } from "./hotels.service";
import { PrismaService } from "../../tools/database.config";

Module({
    imports: [],
    exports: [HotelsService],
    controllers: [HotelsController],
    providers: [HotelsService, PrismaService],
})