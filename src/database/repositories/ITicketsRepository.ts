import { ICreateTicketDTO } from "../../modules/event/dtos/ICreateTicketDTO";
import { Ticket } from "../entities/Ticket";

export interface ITicketsRepository {
    create(data: ICreateTicketDTO): Promise<Ticket>;
    list(user_id: number): Promise<Ticket[]>;
}