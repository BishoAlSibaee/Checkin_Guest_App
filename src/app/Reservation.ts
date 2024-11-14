export class Reservation 
{
    id:number
    RoomNumber : number
    ClientId : number
    Status : number
    RoomOrSuite : number
    MultiRooms : number
    AddRoomNumber : string
    AddRoomId : string
    StartDate : string
    Nights : number
    EndDate : string
    Hotel : number
    BuildingNo  : number
    Floor : number
    ClientFirstName : string
    ClientLastName : string
    IdType : string
    IdNumber : number
    MobileNumber : number
    Email : string
    Rating : number

    constructor(
        id:number,
        RoomNumber : number,
        ClientId : number,
        Status : number,
        RoomOrSuite : number,
        MultiRooms : number,
        AddRoomNumber : string,
        AddRoomId : string,
        StartDate : string,
        Nights : number,
        EndDate : string,
        Hotel : number,
        BuildingNo  : number,
        Floor : number,
        ClientFirstName : string,
        ClientLastName : string,
        IdType : string,
        IdNumber : number,
        MobileNumber : number,
        Email : string,
        Rating : number
    ) {
        this.id = id
        this.AddRoomId = AddRoomId
        this.AddRoomNumber = AddRoomNumber
        this.BuildingNo = BuildingNo
        this.ClientFirstName = ClientFirstName
        this.ClientId = ClientId
        this.ClientLastName = ClientLastName
        this.Email = Email
        this.EndDate = EndDate
        this.Floor = Floor
        this.Hotel = Hotel
        this.IdNumber = IdNumber
        this.IdType = IdType
        this.MobileNumber = MobileNumber
        this.MultiRooms = MultiRooms
        this.Nights = Nights
        this.Rating = Rating
        this.RoomNumber = RoomNumber
        this.RoomOrSuite = RoomOrSuite
        this.StartDate = StartDate
        this.Status = Status
    }
}