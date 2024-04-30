import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import AddSheet from "./addSheet";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress";


const HabitList = ()=>{

    const {toast} = useToast();

    type HabitType = {
        id:number,
        name:string,
        status:boolean,
        streak:number,
        dateCreated: Date,
        completedDates : Date[],
    }
    const [habitlist,setHabits] = useState([
        {
            id:1,
            name:"Drink Water",
            status:true,
            streak: 2,
            dateCreated: new Date('2024-04-22'),
            completedDates: [new Date('2024-04-22'), new Date('2024-04-23')]
        },
        {
            id:2,
            name:"Workout",
            status:false,
            streak:0,
            dateCreated: new Date('2024-04-22'),
            completedDates: []
        },
        {
            id:3,
            name:"No fap",
            status:true,
            streak:2,
            dateCreated: new Date('2024-04-22'),
            completedDates: [new Date('2024-04-22'), new Date('2024-04-23')]
        }
    ])
    const checkHandler = (id:number)=>{
        setHabits(
            habitlist.map(
                (habit)=>{
                    if(habit.id == id){
                        
                        const newStatus = !habit.status;
                        const completedDates = newStatus
                          ? [...habit.completedDates, new Date()]
                          : habit.completedDates.filter(date => date.toDateString() !== new Date().toDateString());
              
                        const lastCompletedDate = completedDates.length > 0 ? Math.max(...completedDates.map(date => date.getTime())) : null;
                        const streak = (newStatus && lastCompletedDate!=null)
                          ? habit.completedDates.some((date, index) => date.getTime() === lastCompletedDate - (index * 24 * 60 * 60 * 1000))
                            ? habit.streak + 1
                            : 1
                          : 0;
              
                        return { ...habit, status: newStatus, completedDates, streak };
                    }
                    else{
                        return habit
                    }
                }
                
            ));
            const time =Date.now();
            const now = new Date(time);
            toast({
                title: "Task Updated",
                description: now.toDateString()
            });

    }

    const isHabitCompletedOnDate = (habit: HabitType, date: Date) => {
        return habit.completedDates.some(completedDate => completedDate.toDateString() === date.toDateString());
      }

    return(
        <div className="flex flex-col">
            <div className="flex flex-row justify-around p-10 items-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">Habit List</h1>
                <div className="mt-6">
                <AddSheet/>

                </div>
            </div>
            <div className="m-auto">
                <Table>
                    <TableCaption>Recent habits</TableCaption>
                    <TableHeader>
                        <TableHead className="w-[300px] text-xl font-bold">Habit</TableHead>
                        <TableHead className="w-[200px] text-xl font-bold">Status</TableHead>
                        <TableHead className="w-[200px] text-xl font-bold">Streak</TableHead>
                        <TableHead className="w-[200px] text-xl font-bold">Consistency</TableHead>
                        <TableHead className="w-[200px] text-xl text-center font-bold tracking-tight">Toggle</TableHead>
                    </TableHeader>
                    <TableBody>
                        {
                            habitlist.map(
                                
                                (habit)=>{
                                    const daysSinceCreation = Math.ceil((new Date().getTime() - habit.dateCreated.getTime()) / (1000 * 3600 * 24)) -1;
                                    const progressValue = (habit.streak / daysSinceCreation)*100;
                                    return(
                                    <TableRow key={habit.id}>
                                        <TableCell className="m-auto text-base">{habit.name}</TableCell>
                                        <TableCell><p>{habit.status ? <Badge>Completed</Badge>:<Badge>Incomplete</Badge>}</p></TableCell>
                                        <TableCell className="text-base">{habit.streak}</TableCell>
                                        <TableCell><Progress value={progressValue}/></TableCell>
                                        <TableCell className="text-base text-center h-10 w-10"><Checkbox defaultChecked={habit.status} onCheckedChange={()=>{checkHandler(habit.id)} }/></TableCell>
                                    </TableRow>);
                                }
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default HabitList;