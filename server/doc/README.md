### API DOCUMENTATION

## Use case:: Member register

```
POST /members
REQUEST

{
    name: string
}

RESPONSE 

{
    id: int
}
```

## Use case: Pick up a book

```
POST /loans
REQUEST 
{
    memberId: int,
    bookId: int,
}
RESPONSE
{
    deadline: datetime
}
```
## Use case: Return a book

```
PATCH /loans
REQUEST
{

    bookId: int,
}

RESPONSE 
{
    status: 'ontime' | 'delayed' #TBD
}


```


## Use case: List  loans and member filtered

```
GET /loan?memberId=memberId&activeLoans=boolean
REQUEST
{

}
RESPONSE {
    loans: {
        returnDate:datetime,
        loanDate:datetime,
        deadline:datetime,
        bookTitle:string,
    }
}
```