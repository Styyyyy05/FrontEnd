import { defineStore } from "pinia";
import { axiosInstance } from '../plugins/axios';
import { handleError } from "@/helpers/errorHelper";
import router from "@/router";

export const useDevelopmentApplicantStore = defineStore("development-applicant", {
    state: () => ({
        developmentApplicants: [],
        meta: {
            current_page: 1,
            last_page: 1,
            per_page: 10,
            total: 0,
        },
        loading: false,
        error: null,
        success: null,
    }),
    actions: {
        async approveDevelopmentApplicant(id) {
            this.loading = true

            try {
                const response = await axiosInstance.patch(`/development-applicant/${id}/approve`)

                this.success = response.data.message

                return response.data
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },
        async rejectDevelopmentApplicant(id) {
            this.loading = true

            try {
                const response = await axiosInstance.patch(`/development-applicant/${id}/reject`)

                this.success = response.data.message

                return response.data
            } catch (error) {
                this.error = handleError(error)
            } finally {
                this.loading = false
            }
        },
    }
})