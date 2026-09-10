import { useMemo, useState } from 'react'
import { Pressable, useWindowDimensions } from 'react-native'
import { Text, XStack, YStack } from 'tamagui'

import { AppInput } from '@/components/form/Input'
import { Label } from '@/components/form/Label'
import { AppSelect } from '@/components/form/Select'
import { AppModal, useModal } from '@/components/profile/shared'
import { useTemplateConfig } from '@/context/TemplateConfigContext'
import { error, success, warning } from '@/theme/colors'

type CalEvent = {
  id: string
  title: string
  date: string // YYYY-MM-DD
  level: 'Danger' | 'Success' | 'Primary' | 'Warning'
}

function toKey(d: Date) {
  return d.toISOString().slice(0, 10)
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

function daysInMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
}

export function CalendarBoard() {
  const { width } = useWindowDimensions()
  const { brandColor } = useTemplateConfig()
  const levelColor = {
    Danger: error[500],
    Success: success[500],
    Primary: brandColor,
    Warning: warning[500],
  } as const
  const cellMin = width < 640 ? 44 : 72
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()))
  const [events, setEvents] = useState<CalEvent[]>(() => {
    const today = new Date()
    return [
      {
        id: '1',
        title: 'Event Conf.',
        date: toKey(today),
        level: 'Danger',
      },
      {
        id: '2',
        title: 'Meeting',
        date: toKey(new Date(Date.now() + 86400000)),
        level: 'Success',
      },
      {
        id: '3',
        title: 'Workshop',
        date: toKey(new Date(Date.now() + 172800000)),
        level: 'Primary',
      },
    ]
  })

  const { isOpen, openModal, closeModal } = useModal()
  const [selected, setSelected] = useState<CalEvent | null>(null)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [level, setLevel] = useState('Primary')

  const grid = useMemo(() => {
    const first = startOfMonth(cursor)
    const total = daysInMonth(cursor)
    const startPad = first.getDay() // 0 Sun
    const cells: Array<{ day: number | null; key: string }> = []
    for (let i = 0; i < startPad; i++) cells.push({ day: null, key: `pad-${i}` })
    for (let d = 1; d <= total; d++) {
      const dt = new Date(cursor.getFullYear(), cursor.getMonth(), d)
      cells.push({ day: d, key: toKey(dt) })
    }
    while (cells.length % 7 !== 0) {
      cells.push({ day: null, key: `end-${cells.length}` })
    }
    return cells
  }, [cursor])

  const monthLabel = cursor.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  })

  const openCreate = (dateKey?: string) => {
    setSelected(null)
    setTitle('')
    setDate(dateKey ?? toKey(new Date()))
    setLevel('Primary')
    openModal()
  }

  const openEdit = (ev: CalEvent) => {
    setSelected(ev)
    setTitle(ev.title)
    setDate(ev.date)
    setLevel(ev.level)
    openModal()
  }

  const save = () => {
    if (!title.trim() || !date) return
    if (selected) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === selected.id
            ? { ...e, title, date, level: level as CalEvent['level'] }
            : e
        )
      )
    } else {
      setEvents((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          title,
          date,
          level: level as CalEvent['level'],
        },
      ])
    }
  }

  return (
    <>
      <YStack
        rounded={16}
        borderWidth={1}
        borderColor="$borderColor"
        bg="$backgroundStrong"
        overflow="hidden"
      >
        <XStack
          px="$4"
          py="$3"
          items="center"
          justify="space-between"
          gap="$3"
          flexWrap="wrap"
          borderBottomWidth={1}
          borderColor="$borderColor"
        >
          <XStack items="center" gap="$2">
            <Pressable
              onPress={() =>
                setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
              }
            >
              <XStack
                width={36}
                height={36}
                rounded={8}
                borderWidth={1}
                borderColor="$borderColor"
                items="center"
                justify="center"
              >
                <Text>‹</Text>
              </XStack>
            </Pressable>
            <Pressable
              onPress={() =>
                setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
              }
            >
              <XStack
                width={36}
                height={36}
                rounded={8}
                borderWidth={1}
                borderColor="$borderColor"
                items="center"
                justify="center"
              >
                <Text>›</Text>
              </XStack>
            </Pressable>
            <Pressable onPress={() => openCreate()}>
              <XStack
                px={12}
                height={36}
                rounded={8}
                bg={brandColor as any}
                items="center"
              >
                <Text color="#fff" fontWeight="600" fontSize={13}>
                  Add Event +
                </Text>
              </XStack>
            </Pressable>
          </XStack>
          <Text fontSize={18} fontWeight="600" color="$color">
            {monthLabel}
          </Text>
          <Text fontSize={13} color="$gray10">
            Month view
          </Text>
        </XStack>

        <XStack borderBottomWidth={1} borderColor="$borderColor">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <YStack key={d} flex={1} py="$2" items="center">
              <Text fontSize={12} fontWeight="500" color="$gray10">
                {d}
              </Text>
            </YStack>
          ))}
        </XStack>

        <YStack>
          {Array.from({ length: Math.ceil(grid.length / 7) }, (_, row) => (
            <XStack key={`row-${row}`}>
              {grid.slice(row * 7, row * 7 + 7).map((cell) => {
                const dayEvents = cell.day
                  ? events.filter((e) => e.date === cell.key)
                  : []
                return (
                  <Pressable
                    key={cell.key}
                    style={{ flex: 1 }}
                    onPress={() => {
                      if (!cell.day) return
                      if (dayEvents[0]) openEdit(dayEvents[0])
                      else openCreate(cell.key)
                    }}
                  >
                    <YStack
                      minH={cellMin}
                      borderRightWidth={1}
                      borderBottomWidth={1}
                      borderColor="$borderColor"
                      p="$1.5"
                      bg={cell.day ? '$backgroundStrong' : '$background'}
                      opacity={cell.day ? 1 : 0.45}
                    >
                      {cell.day ? (
                        <Text fontSize={12} color="$gray11" mb={4}>
                          {cell.day}
                        </Text>
                      ) : null}
                      <YStack gap={2}>
                        {dayEvents.slice(0, 2).map((ev) => (
                          <YStack
                            key={ev.id}
                            px={4}
                            py={2}
                            rounded={4}
                            bg={levelColor[ev.level] as any}
                          >
                            <Text fontSize={10} color="#fff" numberOfLines={1}>
                              {ev.title}
                            </Text>
                          </YStack>
                        ))}
                      </YStack>
                    </YStack>
                  </Pressable>
                )
              })}
            </XStack>
          ))}
        </YStack>
      </YStack>

      <AppModal
        isOpen={isOpen}
        onClose={closeModal}
        title={selected ? 'Edit Event' : 'Add Event'}
        subtitle="Create or update a calendar event."
        onSave={save}
        saveLabel={selected ? 'Update Event' : 'Add Event'}
      >
        <YStack gap="$3">
          <YStack>
            <Label>Event Title</Label>
            <AppInput value={title} onChangeText={setTitle} placeholder="Event title" />
          </YStack>
          <YStack>
            <Label>Date</Label>
            <AppInput value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" />
          </YStack>
          <YStack>
            <Label>Event Color</Label>
            <AppSelect
              options={[
                { value: 'Primary', label: 'Primary' },
                { value: 'Success', label: 'Success' },
                { value: 'Danger', label: 'Danger' },
                { value: 'Warning', label: 'Warning' },
              ]}
              value={level}
              onChange={setLevel}
            />
          </YStack>
        </YStack>
      </AppModal>
    </>
  )
}
