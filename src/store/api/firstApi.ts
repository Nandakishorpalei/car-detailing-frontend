// @ts-nocheck
import {
  ChatTicket,
  ChatTicketCreateResult,
  ChatTicketPayload,
  ChatUpdatePayload,
  TicketNotes,
  TicketNotesPayload,
  TicketNotesResponse,
} from "types/Models/chatTicket";
import { emptyApi } from "./emptyApi";
import qs from "qs";

const extendedApi = emptyApi.injectEndpoints({
  endpoints: (build) => ({
    createChatTicket: build.mutation<ChatTicketCreateResult, ChatTicketPayload>(
      {
        query: ({
          channel_url,
          assignee_profile_ids,
          message_id,
          ticket_title,
          tag_ids,
          company_group_id,
          is_non_chat_ticket,
        }) => {
          return {
            url: "/api/inkle/tickets/",
            method: "post",
            body: {
              channel_url,
              assignee_profile_ids,
              message_id,
              ticket_title,
              tag_ids,
              company_group_id,
              is_non_chat_ticket,
            },
          };
        },
        invalidatesTags: ["ChatTickets"],
      }
    ),
    getChatTickets: build.query<
      {
        current_page: number;
        tickets: ChatTicket[];
        total_count: number;
        total_pages: number;
        unresolved_tickets: number;
      },
      {
        assignee_profile_ids: string | null;
        resolved_status: boolean | null;
        page_num: number;
      }
    >({
      query: ({ assignee_profile_ids, resolved_status, page_num }) => {
        let queryUrl = qs.stringify(
          { page_num, assignee_profile_ids, resolved_status },
          {
            skipNulls: true,
            addQueryPrefix: true,
          }
        );
        return {
          url: `/api/inkle/tickets/${queryUrl}`,
        };
      },
      providesTags: ["ChatTickets"],
    }),
    updateChatTicket: build.mutation<ChatTicket, ChatUpdatePayload>({
      query: ({
        assignee_profile_ids,
        resolved_status,
        ticket_id,
        ticket_title,
        tag_ids,
        remove_tag_id,
      }) => {
        return {
          url: `/api/inkle/tickets/${ticket_id}/`,
          method: "put",
          body: {
            assignee_profile_ids,
            resolved_status,
            ticket_title,
            tag_ids,
            remove_tag_id,
          },
        };
      },
      invalidatesTags: ["ChatTickets"],
    }),
    getCustomerChatTickets: build.query<
      {
        current_page: number;
        tickets: ChatTicket[];
        total_count: number;
        total_pages: number;
        unresolved_tickets: number;
      },
      {
        resolved_status: boolean | null;
        page_num: number;
        group_id: string;
      }
    >({
      query: ({ resolved_status, page_num, group_id }) => {
        let queryUrl = qs.stringify(
          { page_num, resolved_status },
          {
            skipNulls: true,
            addQueryPrefix: true,
          }
        );
        return {
          url: `/api/inkle/tickets/group/${group_id}/${queryUrl}`,
        };
      },
      providesTags: ["CustomerChatTickets"],
    }),
    getSingleChatTickets: build.query<ChatTicket, { ticketUuid: string }>({
      query: ({ ticketUuid }) => `/api/inkle/tickets/${ticketUuid}`,
    }),
    createTicketNotes: build.mutation<TicketNotes, TicketNotesPayload>({
      query: ({ groupId, ticketId, description }) => {
        return {
          url: `/api/inkle/notes/group/${groupId}/tickets/${ticketId}/`,
          method: "post",
          body: {
            description,
          },
        };
      },
      invalidatesTags: ["TicketNotes"],
    }),
    getTicketNotes: build.query<
      TicketNotesResponse,
      { groupId: string; ticketId: string; pageNum: number }
    >({
      query: ({ groupId, ticketId, pageNum }) =>
        `/api/inkle/notes/group/${groupId}/tickets/${ticketId}?page_num=${pageNum}`,
      providesTags: ["TicketNotes"],
    }),
    updateTicketNotes: build.mutation<
      TicketNotes,
      { noteId: string; description: string }
    >({
      query: ({ noteId, description }) => {
        return {
          url: `/api/inkle/notes/${noteId}/`,
          method: "put",
          body: {
            description,
          },
        };
      },
      invalidatesTags: ["TicketNotes"],
    }),
    deleteTicketNotes: build.mutation<any, { noteId: string }>({
      query: ({ noteId }) => {
        return {
          url: `/api/inkle/notes/${noteId}/`,
          method: "delete",
        };
      },
      invalidatesTags: ["TicketNotes"],
    }),
  }),
});

export const {
  useCreateChatTicketMutation,
  useGetChatTicketsQuery,
  useUpdateChatTicketMutation,
  useGetCustomerChatTicketsQuery,
  useGetSingleChatTicketsQuery,
  useCreateTicketNotesMutation,
  useGetTicketNotesQuery,
  useUpdateTicketNotesMutation,
  useDeleteTicketNotesMutation,
} = extendedApi;
