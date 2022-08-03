export interface Room{
  id:number,
  name_room:string
}
export interface ResponseRoom{
  status:number,
  data:Room[],
  message:string
}
