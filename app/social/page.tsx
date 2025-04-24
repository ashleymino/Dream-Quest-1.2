"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Gift, Heart, MessageSquare, Search, Send, ThumbsUp, User, UserPlus } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for friends
const friends = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AJ",
    goals: [
      { id: 1, title: "Learn Guitar", progress: 75, completed: false },
      { id: 2, title: "Run a Marathon", progress: 100, completed: true },
    ],
  },
  {
    id: 2,
    name: "Sam Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ST",
    goals: [
      { id: 1, title: "Read 30 Books", progress: 60, completed: false },
      { id: 2, title: "Learn Spanish", progress: 40, completed: false },
    ],
  },
  {
    id: 3,
    name: "Jamie Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JS",
    goals: [
      { id: 1, title: "Meditate Daily", progress: 90, completed: false },
      { id: 2, title: "Travel to Japan", progress: 100, completed: true },
    ],
  },
]

// Mock data for friend requests
const friendRequests = [
  {
    id: 1,
    name: "Taylor Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "TW",
  },
  {
    id: 2,
    name: "Jordan Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JL",
  },
]

// Mock data for activity feed
const activityFeed = [
  {
    id: 1,
    user: friends[0],
    type: "completed",
    goal: "Run a Marathon",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: friends[2],
    type: "completed",
    goal: "Travel to Japan",
    timestamp: "1 day ago",
  },
  {
    id: 3,
    user: friends[1],
    type: "milestone",
    goal: "Read 30 Books",
    detail: "Reached 60% completion",
    timestamp: "2 days ago",
  },
]

export default function SocialPage() {
  const [selectedFriend, setSelectedFriend] = useState<any>(null)
  const [selectedGoal, setSelectedGoal] = useState<any>(null)
  const [isCongratulateOpen, setIsCongratulateOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-300 mb-8">Social</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Friends</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search friends..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="friends">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="friends">My Friends</TabsTrigger>
                  <TabsTrigger value="requests">Requests</TabsTrigger>
                </TabsList>

                <TabsContent value="friends" className="mt-4">
                  <div className="space-y-4">
                    {friends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                        onClick={() => setSelectedFriend(friend)}
                      >
                        <Avatar>
                          <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                          <AvatarFallback>{friend.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{friend.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {friend.goals.filter((g) => g.completed).length} completed goals
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="requests" className="mt-4">
                  <div className="space-y-4">
                    {friendRequests.map((request) => (
                      <div key={request.id} className="flex items-center gap-3 p-3 rounded-lg">
                        <Avatar>
                          <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                          <AvatarFallback>{request.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{request.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Wants to connect</p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-500">
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                            <User className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>See what your friends are up to</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="flex gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <Avatar>
                      <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                      <AvatarFallback>{activity.user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{activity.user.name}</h4>
                        {activity.type === "completed" && <Badge className="bg-green-500">Completed</Badge>}
                        {activity.type === "milestone" && <Badge className="bg-blue-500">Milestone</Badge>}
                      </div>
                      <p className="text-sm">
                        {activity.type === "completed"
                          ? `Completed the goal: ${activity.goal}`
                          : `${activity.detail} on goal: ${activity.goal}`}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => {
                            setSelectedGoal({
                              title: activity.goal,
                              user: activity.user,
                              completed: activity.type === "completed",
                            })
                            setIsCongratulateOpen(true)
                          }}
                        >
                          <Gift className="h-3 w-3 mr-1" />
                          Congratulate
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Like
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedFriend ? (
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedFriend.avatar || "/placeholder.svg"} alt={selectedFriend.name} />
                    <AvatarFallback>{selectedFriend.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedFriend.name}</CardTitle>
                    <CardDescription>
                      {selectedFriend.goals.filter((g) => g.completed).length} completed goals •{" "}
                      {selectedFriend.goals.length} total goals
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-4">Goals</h3>
                <div className="space-y-6">
                  {selectedFriend.goals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{goal.title}</h4>
                        {goal.completed ? (
                          <Badge className="bg-green-500">Completed</Badge>
                        ) : (
                          <span className="text-sm text-slate-500 dark:text-slate-400">{goal.progress}%</span>
                        )}
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex justify-end gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs"
                          onClick={() => {
                            setSelectedGoal({
                              title: goal.title,
                              user: selectedFriend,
                              completed: goal.completed,
                            })
                            setIsCongratulateOpen(true)
                          }}
                        >
                          <Gift className="h-3 w-3 mr-1" />
                          Send Congratulations
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          <Heart className="h-3 w-3 mr-1" />
                          Encourage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button variant="outline" onClick={() => setSelectedFriend(null)}>
                  Back to Friends
                </Button>
                <Button>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm h-full flex flex-col justify-center items-center p-8">
              <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Select a Friend</h2>
              <p className="text-center text-slate-500 dark:text-slate-400 mb-6 max-w-md">
                Choose a friend from the list to view their goals and progress, or send them congratulations on their
                achievements.
              </p>
              <Button>Find Friends</Button>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={isCongratulateOpen} onOpenChange={setIsCongratulateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Congratulations</DialogTitle>
            <DialogDescription>
              {selectedGoal?.completed
                ? `Congratulate ${selectedGoal?.user?.name} on completing ${selectedGoal?.title}!`
                : `Encourage ${selectedGoal?.user?.name} on their progress with ${selectedGoal?.title}!`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Write a personal message..."
                defaultValue={
                  selectedGoal?.completed
                    ? `Congratulations on completing ${selectedGoal?.title}! That's amazing!`
                    : `You're making great progress on ${selectedGoal?.title}! Keep it up!`
                }
              />
            </div>
            {selectedGoal?.completed && (
              <div className="grid gap-2">
                <Label htmlFor="gift">Include a Gift</Label>
                <Select defaultValue="none">
                  <SelectTrigger id="gift">
                    <SelectValue placeholder="Select a gift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Gift</SelectItem>
                    <SelectItem value="coffee">Coffee Gift Card ($5)</SelectItem>
                    <SelectItem value="amazon">Amazon Gift Card ($10)</SelectItem>
                    <SelectItem value="spotify">Spotify Premium (1 month)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCongratulateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCongratulateOpen(false)}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
