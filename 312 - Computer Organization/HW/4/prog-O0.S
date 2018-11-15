	.file	"prog.c"
	.globl	insn_count
	.bss
	.align 8
	.type	insn_count, @object
	.size	insn_count, 8
insn_count:
	.zero	8
	.text
	.globl	bubble_sort
	.type	bubble_sort, @function
bubble_sort:
.LFB2:
	.cfi_startproc
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	movq	%rdi, -24(%rbp)
	movl	%esi, -28(%rbp)
	movq	insn_count(%rip), %rax
	addq	$1, %rax
	movq	%rax, insn_count(%rip)
	movl	$0, -4(%rbp)
	jmp	.L2
.L8:
	movl	$0, -12(%rbp)
	movl	$1, -8(%rbp)
	jmp	.L3
.L5:
	movl	-8(%rbp), %eax
	cltq
	salq	$2, %rax
	leaq	-4(%rax), %rdx
	movq	-24(%rbp), %rax
	addq	%rdx, %rax
	movl	(%rax), %edx
	movl	-8(%rbp), %eax
	cltq
	leaq	0(,%rax,4), %rcx
	movq	-24(%rbp), %rax
	addq	%rcx, %rax
	movl	(%rax), %eax
	cmpl	%eax, %edx
	jle	.L4
	movl	-8(%rbp), %eax
	cltq
	leaq	0(,%rax,4), %rdx
	movq	-24(%rbp), %rax
	addq	%rdx, %rax
	movl	(%rax), %eax
	movl	%eax, -16(%rbp)
	movl	-8(%rbp), %eax
	cltq
	leaq	0(,%rax,4), %rdx
	movq	-24(%rbp), %rax
	addq	%rax, %rdx
	movl	-8(%rbp), %eax
	cltq
	salq	$2, %rax
	leaq	-4(%rax), %rcx
	movq	-24(%rbp), %rax
	addq	%rcx, %rax
	movl	(%rax), %eax
	movl	%eax, (%rdx)
	movl	-8(%rbp), %eax
	cltq
	salq	$2, %rax
	leaq	-4(%rax), %rdx
	movq	-24(%rbp), %rax
	addq	%rax, %rdx
	movl	-16(%rbp), %eax
	movl	%eax, (%rdx)
	movl	$1, -12(%rbp)
.L4:
	addl	$1, -8(%rbp)
.L3:
	movl	-8(%rbp), %eax
	cmpl	-28(%rbp), %eax
	jl	.L5
	cmpl	$0, -12(%rbp)
	jne	.L6
	jmp	.L1
.L6:
	addl	$1, -4(%rbp)
.L2:
	movl	-4(%rbp), %eax
	cmpl	-28(%rbp), %eax
	jl	.L8
.L1:
	popq	%rbp
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE2:
	.size	bubble_sort, .-bubble_sort
	.globl	check_sorted
	.type	check_sorted, @function
check_sorted:
.LFB3:
	.cfi_startproc
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	movq	%rdi, -24(%rbp)
	movl	%esi, -28(%rbp)
	movq	insn_count(%rip), %rax
	addq	$1, %rax
	movq	%rax, insn_count(%rip)
	movl	$1, -4(%rbp)
	jmp	.L10
.L13:
	movl	-4(%rbp), %eax
	cltq
	salq	$2, %rax
	leaq	-4(%rax), %rdx
	movq	-24(%rbp), %rax
	addq	%rdx, %rax
	movl	(%rax), %edx
	movl	-4(%rbp), %eax
	cltq
	leaq	0(,%rax,4), %rcx
	movq	-24(%rbp), %rax
	addq	%rcx, %rax
	movl	(%rax), %eax
	cmpl	%eax, %edx
	jle	.L11
	movl	$0, %eax
	jmp	.L12
.L11:
	addl	$1, -4(%rbp)
.L10:
	movl	-4(%rbp), %eax
	cmpl	-28(%rbp), %eax
	jl	.L13
	movl	$1, %eax
.L12:
	popq	%rbp
	.cfi_def_cfa 7, 8
	ret
	.cfi_endproc
.LFE3:
	.size	check_sorted, .-check_sorted
	.comm	numbers,40000,32
	.section	.rodata
.LC0:
	.string	"numbers are sorted"
.LC1:
	.string	"numbers are not sorted"
	.align 8
.LC2:
	.string	"%lld instructions are executed\n"
	.text
	.globl	main
	.type	main, @function
main:
.LFB4:
	.cfi_startproc
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	subq	$16, %rsp
	movq	$45, -16(%rbp)
	movq	insn_count(%rip), %rax
	addq	$1, %rax
	movq	%rax, insn_count(%rip)
	movl	$0, -4(%rbp)
	jmp	.L15
.L16:
	call	rand
	movl	-4(%rbp), %edx
	movslq	%edx, %rdx
	movl	%eax, numbers(,%rdx,4)
	addl	$1, -4(%rbp)
.L15:
	cmpl	$9999, -4(%rbp)
	jle	.L16
	movl	$10000, %esi
	movl	$numbers, %edi
	call	bubble_sort
	movl	$10000, %esi
	movl	$numbers, %edi
	call	check_sorted
	testl	%eax, %eax
	je	.L17
	movl	$.LC0, %edi
	call	puts
	jmp	.L18
.L17:
	movl	$.LC1, %edi
	call	puts
.L18:
	movq	insn_count(%rip), %rax
	movq	%rax, %rsi
	movl	$.LC2, %edi
	movl	$0, %eax
	call	printf
	movl	$0, %edi
	call	exit
	.cfi_endproc
.LFE4:
	.size	main, .-main
	.ident	"GCC: (GNU) 4.8.5 20150623 (Red Hat 4.8.5-11)"
	.section	.note.GNU-stack,"",@progbits
