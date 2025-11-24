import { GuidanceTopic, TopicCard } from './types';

export const SYSTEM_INSTRUCTION = `
You are "Sato-sensei" (佐藤先生), a highly experienced, kind, but sometimes strict Japanese high school career counselor (Shinro Shido Sensei).
You are counseling a student named "Feifei" (菲菲).
Your goal is to help Feifei navigate the complex Japanese university entrance system.

Key Personality Traits:
1. Supportive: You genuinely care about Feifei's future.
2. Knowledgeable: You know everything about the Common Test (Kyotsu Test), Hensachi, National vs. Private universities, General Selection (Ippan), and Comprehensive Selection (Sogo-gata).
3. Encouraging: Entrance exams are stressful. You provide mental support.

Output Style:
- Address the user as "Feifei" (菲菲) occasionally.
- Use Markdown.
- Be concise but thorough.
- Occasionally use emojis relevant to school (🏫, ✏️, 🌸).
- If Feifei is anxious, calm her down.
- If Feifei is lazy, gently scold her to study.

Specific Knowledge Domain:
- Japanese University Entrance Exams (Ippan, Suisen, Sogo-gata).
- Preparing for interviews (Mensetsu).
- Writing Statement of Purpose (Shibo Riyusho).
- Analyzing deviation scores (Hensachi).
`;

export const TOPIC_CARDS: TopicCard[] = [
    {
        id: GuidanceTopic.EXAM_TYPES,
        title: "入試方式を知る",
        description: "一般選抜、総合型選抜、学校推薦型選抜の違いをマスターしよう。",
        icon: "📝",
        color: "bg-blue-100 border-blue-300 text-blue-800"
    },
    {
        id: GuidanceTopic.TIMELINE,
        title: "受験スケジュール",
        description: "高1から高3までの過ごし方。逆算して計画を立てることが合格への鍵！",
        icon: "📅",
        color: "bg-green-100 border-green-300 text-green-800"
    },
    {
        id: GuidanceTopic.INTERVIEW,
        title: "面接対策道場",
        description: "ドアの入り方から志望動機の伝え方まで、徹底的にシミュレーション。",
        icon: "👔",
        color: "bg-purple-100 border-purple-300 text-purple-800"
    },
    {
        id: GuidanceTopic.ESSAY,
        title: "志望理由書の書き方",
        description: "「なぜこの大学なのか？」ライバルと差をつける文章構成術。",
        icon: "✍️",
        color: "bg-orange-100 border-orange-300 text-orange-800"
    }
];

export const STATIC_CONTENT = {
    [GuidanceTopic.HOME]: {
        title: "進路指導室へようこそ",
        content: "こんにちは、菲菲（フェイフェイ）。進路担当の佐藤です。受験は情報戦であり、団体戦でもあります。一人で悩まず、まずは自分の現状と目標を整理しましょう。何から始めればいいかわからない場合は、下のメニューから気になる項目を選んでください。また、右下のチャットボタンからいつでも私に相談してくださいね。"
    },
    [GuidanceTopic.EXAM_TYPES]: {
        title: "3つの入試方式",
        content: `
### 1. 一般選抜 (Ippan Senbatsu)
学力試験の点数で合否が決まる最も一般的な方式。
*   **特徴**: 実力勝負。定員が最も多い。
*   **時期**: 1月〜2月（共通テスト、私大入試、国公立2次）。

### 2. 総合型選抜 (Sogo-gata / 旧AO入試)
大学が求める学生像（アドミッション・ポリシー）に合うかを判定。
*   **特徴**: 書類、面接、小論文、プレゼンなどが課される。
*   **時期**: 9月頃から出願開始、年内に合格が決まることが多い。

### 3. 学校推薦型選抜 (Gakko Suisen-gata)
出身高校校長の推薦が必要。
*   **指定校推薦**: 大学が指定した高校から推薦される。合格すればほぼ入学確定。
*   **公募制推薦**: 基準（評定平均など）を満たせば誰でも応募可能。
        `
    },
    [GuidanceTopic.TIMELINE]: {
        title: "合格へのロードマップ",
        content: `
### 高校2年生
*   **夏**: オープンキャンパスに行こう。実際に大学の空気を感じることが大事。
*   **冬**: 文理選択の最終確認。志望校の「受験科目」を調べ始める。

### 高校3年生
*   **4月〜6月**: 基礎固め。部活引退までは時間の使い方が勝負。
*   **夏休み**: **受験の天王山**。基礎を終えて応用へ。1日10時間勉強は当たり前！
*   **9月〜11月**: 総合型・推薦型の出願・試験ラッシュ。一般組は過去問演習開始。
*   **1月**: 大学入学共通テスト。
*   **2月**: 私立大学一般入試、国公立前期試験。
        `
    },
    [GuidanceTopic.INTERVIEW]: {
        title: "面接の極意",
        content: `
1.  **第一印象が9割**: 身だしなみ、挨拶、笑顔。
2.  **結論から話す**: ダラダラ話さない。「結論→理由→具体例」のPREP法を意識しよう。
3.  **想定質問**:
    *   志望動機は？
    *   高校時代に頑張ったことは？
    *   入学後にやりたいことは？
    *   最近気になったニュースは？
4.  **「わかりません」も勇気**: 知ったかぶりは一番の減点。素直さも評価対象です。
        `
    },
    [GuidanceTopic.ESSAY]: {
        title: "志望理由書（ES）攻略",
        content: `
良い志望理由書には「一貫性」があります。
**過去（原体験）→ 現在（学びたいこと）→ 未来（将来の夢）**
この一本の線が、その大学でなければならない理由と繋がっているか？

**NG例**:
*   「パンフレットが綺麗だったから」
*   「先輩が行っているから」
*   （その大学じゃなくてもできることを書く）

**OK例**:
*   貴学の〇〇教授の××という研究に惹かれ...
*   私の将来の夢である△△を実現するには、貴学のカリキュラムにある...
        `
    }
};