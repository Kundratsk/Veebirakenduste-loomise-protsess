
type RoleExclude = "admin" | "user" | "moderator"
type ExcludeRole = "testing" | "admin" | "user" | "security"

//võta mõlemast typest kokku ja välista teatud väärtused
type O = Exclude<ExcludeRole, "user" | "moderator">
// mis on ternary operator
// condition = exprIfTrue : exprIfFalse