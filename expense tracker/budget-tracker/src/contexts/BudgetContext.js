import React, {useContext, useState} from 'react';
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage';
const BudgetContext= React.createContext(); 

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"





export function useBudgets() {
    return useContext(BudgetContext)
     

}

export const BudgetsProvider =({children}) => {
   const [budgets, setBudgets]=useLocalStorage("budgets", [])
    const [expenses, setExpenses]=useLocalStorage("expenses", [])
    
   function getBudgetExpenses(budgetId){
    return expenses.filter(expense => expense.budgetId===budgetId)

   }
   function addExpense({description, amount, budgetId}){
        setExpenses(prevExpenses =>{
            return [...prevExpenses, {id: uuidV4(), description, amount, budgetId}]
        })

   }
   function  addBudget({name, max}){
     setBudgets(prevBudgets =>{
        if(prevBudgets.find(budget=>budget.name===name)){
            return prevBudgets
        }
        return [...prevBudgets, {id: uuidV4(), name, max }]
     })

   }
   // what we are doing in addbudget is keeping the prevBudgets as it is and making a new budget and adding the new name and max properties to it and giving it an id
   function deleteExpense({id}){
    setExpenses(prevExpenses=>{
        return prevExpenses.filter(expense => expense.id!==id)
     })
   }
   function deleteBudget({id}){
    // when we delete a budget we want to move the expense to uncategorized budget
     setBudgets(prevBudgets=>{
        return prevBudgets.filter(budget =>budget.id!==id)
     })

   }
    return <BudgetContext.Provider value={{budgets, expenses, getBudgetExpenses, addExpense, addBudget, deleteExpense, deleteBudget}}>
        {children}
    </BudgetContext.Provider>
}