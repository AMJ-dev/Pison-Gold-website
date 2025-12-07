import moment from "moment";
import { useContext } from "react";
import { toast } from "react-toastify";
import {AxiosError} from "axios"
import UserContext from "@/lib/userContext";
import { api_url } from "@/lib/constants";

export const str_to_url = (str:string) => str.toLowerCase().trim().replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "-")

export const is_numeric = (num:any) => (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '');

export const format_number = (x:number) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const readable_date = (date:string) => isEmpty(date) ? "" : moment(Date.parse(date)).format("MMMM Do, YYYY")

export const readable_time = (time: string) => !time ? "" : moment(time, "HH:mm").format("hh:mm a");
export const readable_datetime = (date:string) => {
    const date_time = isEmpty(date) ? "" : moment(Date.parse(date)).format("MMMM Do, YYYY hh:mm a")
    return date_time
}
export const isEmpty = (str:any) => {
  str = String(str)
  return typeof str == undefined || str === "undefined" || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g, "") === "" ? true : false
}
export const ASSET_BASE = (api_url as string)?.replace(/\/+$/, '') || '';

export const resolveSrc = (s: string) => {
	if (!s) return s;
	if (/^(?:https?:|blob:|data:)/i.test(s)) return s;
	if (s.startsWith('/')) return `${ASSET_BASE}${s}`;
	return ASSET_BASE ? `${ASSET_BASE}/${s}` : `/${s}`;
};
export const check_login = ()=>{
	const {login} = useContext(UserContext);
	return new Promise((resolve, reject)=>{
		const remember = localStorage.getItem("remember");
		const storedToken = get_token();
		
		if (storedToken) login({ token: storedToken, remember: remember === "1" });
		resolve(true);
	})
}
export const get_token = ()=>{
    const remember = localStorage.getItem("remember");
    const token = remember === "1" 
        ? localStorage.getItem("token")
        : sessionStorage.getItem("token");
    
    return token;
}
export function truncate_string (string:string){   
    const max_length = 70;
    return string.length > max_length ? `${string.substring(0, max_length)}…`: string
}
export const http_error = (err: AxiosError) => {
	const ax = err as AxiosError<any>;
	const status = ax.response?.status;
	const serverMsg =
		ax.response?.data?.message ??
		ax.response?.data?.error ??
		ax.response?.data?.data ??
		ax.message;

	if (status === 401 || status === 403 || status === 405) toast.error(serverMsg || "Unauthorized");
	else if (status && status >= 500) toast.error("Server error. Please try again later.");
	else if (ax.request && !ax.response) toast.error("Network error. Check your connection.");
	else toast.error(serverMsg || "Unexpected error");
}