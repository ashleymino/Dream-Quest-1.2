"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Calendar, CheckCircle, Clock, FlameIcon as Fire, Share2, Star, Trophy } from "lucide-react"

// Mock data for goals and quests
const goals = [
  {
    id: 1,
    title: "Learn Spanish",
    progress: 65,
    streak: 12,
    milestones: [
      { id: 1, title: "Complete Basics", completed: true },
      { id: 2, title: "Master Greetings", completed: true },
      { id: 3, title: "Learn 100 Words", completed: true },
      { id: 4, title: "Basic Conversations", completed: false },
      { id: 5, title: "Read Simple Text", completed: false },
    ],
    rewards: [
      { id: 1, title: "Beginner Badge", unlocked: true, icon: "award" },
      { id: 2, title: "Conversation Master", unlocked: false, icon: "message-circle" },
    ],
  },
  {
    id: 2,
    title: "Run a Marathon",
    progress: 30,
    streak: 8,
    milestones: [
      { id: 1, title: "Run 5K", completed: true },
      { id: 2, title: "Run 10K", completed: false },
      { id: 3, title: "Run Half Marathon", completed: false },
      { id: 4, title: "Complete Marathon", completed: false },
    ],
    rewards: [
      { id: 1, title: "Runner Badge", unlocked: true, icon: "running" },
      { id: 2, title: "Marathon Finisher", unlocked: false, icon: "trophy" },
    ],
  },
  {
    id: 3,
    title: "Read 24 Books",
    progress: 42,
    streak: 0,
    milestones: [
      { id: 1, title: "Read 6 Books", completed: true },
      { id: 2, title: "Read 12 Books", completed: true },
      { id: 3, title: "Read 18 Books", completed: false },
      { id: 4, title: "Read 24 Books", completed: false },
    ],
    rewards: [
      { id: 1, title: "Bookworm", unlocked: true, icon: "book" },
      { id: 2, title: "Literature Master", unlocked: false, icon: "library" },
    ],
  },
]

export default function ProgressPage() {
  const [activeGoal, setActiveGoal] = useState(goals[0])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-300 mb-8">Your Quest Progress</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                Your Quests
              </CardTitle>
              <CardDescription>Track your journey to success</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      activeGoal.id === goal.id
                        ? "bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 border border-purple-200 dark:border-purple-800"
                        : "hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                    onClick={() => setActiveGoal(goal)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{goal.title}</h3>
                      <Badge
                        variant={goal.streak > 0 ? "default" : "outline"}
                        className={goal.streak > 0 ? "bg-orange-500" : ""}
                      >
                        {goal.streak > 0 ? (
                          <>
                            <Fire className="h-3 w-3 mr-1" /> {goal.streak} day streak
                          </>
                        ) : (
                          "No streak"
                        )}
                      </Badge>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{goal.progress}% complete</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-purple-500" />
                Rewards Earned
              </CardTitle>
              <CardDescription>Badges and achievements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {goals.flatMap((goal) =>
                  goal.rewards
                    .filter((reward) => reward.unlocked)
                    .map((reward) => (
                      <div
                        key={`${goal.id}-${reward.id}`}
                        className="flex flex-col items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-100 dark:border-purple-800"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mb-2">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-center">{reward.title}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{goal.title}</span>
                      </div>
                    )),
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{activeGoal.title}</CardTitle>
                  <CardDescription>Your quest journey</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="bg-white/50 dark:bg-slate-800/50">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Progress
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-medium">{activeGoal.progress}%</span>
                </div>
                <Progress value={activeGoal.progress} className="h-3" />
              </div>

              <div className="relative py-8">
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 z-0"></div>

                <div className="relative z-10 flex justify-between">
                  {activeGoal.milestones.map((milestone, index) => {
                    const position = (index / (activeGoal.milestones.length - 1)) * 100
                    return (
                      <div
                        key={milestone.id}
                        className="flex flex-col items-center"
                        style={{ position: "absolute", left: `${position}%`, transform: "translateX(-50%)" }}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone.completed
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : "bg-slate-200 dark:bg-slate-700"
                          }`}
                        >
                          {milestone.completed ? (
                            <CheckCircle className="h-5 w-5 text-white" />
                          ) : (
                            <Clock className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                          )}
                        </div>
                        <div
                          className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                            milestone.completed
                              ? "text-green-600 dark:text-green-400"
                              : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {milestone.title}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <Tabs defaultValue="stats" className="mt-8">
                <TabsList className="bg-white/50 dark:bg-slate-800/50 w-full justify-start">
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="rewards">Rewards</TabsTrigger>
                </TabsList>

                <TabsContent value="stats" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Current Streak
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center">
                          <Fire className="h-5 w-5 mr-2 text-orange-500" />
                          <span className="text-2xl font-bold">{activeGoal.streak} days</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Milestones
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 mr-2 text-yellow-500" />
                          <span className="text-2xl font-bold">
                            {activeGoal.milestones.filter((m) => m.completed).length}/{activeGoal.milestones.length}
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Next Check-in
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                          <span className="text-lg font-medium">Today</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Completed milestone: Learn 100 Words</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">2 days ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                        <Fire className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Reached a 10-day streak!</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">4 days ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Earned the Beginner Badge</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rewards" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeGoal.rewards.map((reward) => (
                      <div
                        key={reward.id}
                        className={`p-4 rounded-lg border ${
                          reward.unlocked
                            ? "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800"
                            : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-70"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              reward.unlocked
                                ? "bg-gradient-to-r from-purple-500 to-blue-500"
                                : "bg-slate-200 dark:bg-slate-700"
                            }`}
                          >
                            <Award
                              className={`h-6 w-6 ${reward.unlocked ? "text-white" : "text-slate-500 dark:text-slate-400"}`}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{reward.title}</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {reward.unlocked ? "Unlocked" : "Locked"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
