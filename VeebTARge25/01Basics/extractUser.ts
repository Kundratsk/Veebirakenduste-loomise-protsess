type Role = "admin" | "user" | "moderator"

//selliselt saan osa selle andmeid kasutada
type V = Extract<Role, "admin" | "moderator">


type OtherRole = "testing" | "admin" | "user" | "security"

// nii saab kaks type omavahel kokku panna
type X = Extract<Role, OtherRole>